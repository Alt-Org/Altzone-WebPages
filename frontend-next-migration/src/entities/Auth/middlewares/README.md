# Authentication refresh investigation

## Current implementation

`authApi.ts` exposes `refreshAuth` as a `POST /auth/refresh` mutation with the required `{ refreshToken }` JSON body. It returns `AccessTokenInfoResponse`, containing the new access and refresh tokens. The mutation is intentionally not called by production authentication code yet.

The admin page contains a manual probe at `/{lng}/admin`. It displays the refresh response, the current Redux auth state, and a `persist:root` localStorage snapshot after the request. This makes it possible to verify the backend contract without changing the normal login flow. The store migration removes the legacy `AuthUser` and `Profile` keys after successfully writing their replacement.

## Middleware findings

The existing middleware can observe a successful RTK Query mutation with `authEndpoints.refreshAuth.matchFulfilled(action)`. A future integration could then dispatch `authUserActions.setAccessTokenInfo` with the refreshed token and its calculated expiry. Redux Persist saves that state under `persist:root`; authentication middleware no longer writes directly to localStorage. API requests read the current token from Redux state.

The middleware should not start the refresh request itself on every action. It is synchronous, and a request started from the middleware would need a separate expiry trigger, concurrency guard, and failure path. A `baseQuery` wrapper that retries an expired request once after dispatching `refreshAuth` is a better fit for automatic refresh. It must also prevent refresh loops and coordinate concurrent requests.

Before wiring this into production, verify the endpoint response and refresh-cookie behavior with the admin probe. If the response expiry field is not `accessTokenExpiresInSecIn`, update `AccessTokenInfoResponse` and the expiry mapping together.
