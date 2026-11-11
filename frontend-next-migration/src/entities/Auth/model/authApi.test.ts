import { authEndpoints, useRefreshAuthMutation } from './authApi';

describe('authApi refresh endpoint', () => {
    it('exposes the refreshAuth mutation and React hook', () => {
        expect(authEndpoints.refreshAuth).toEqual(
            expect.objectContaining({
                initiate: expect.any(Function),
                matchFulfilled: expect.any(Function),
            }),
        );
        expect(useRefreshAuthMutation).toEqual(expect.any(Function));
    });
});
