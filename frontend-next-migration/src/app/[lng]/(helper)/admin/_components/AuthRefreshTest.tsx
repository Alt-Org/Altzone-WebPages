'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAuthUserState,
    useRefreshAuthMutation,
    AccessTokenInfoResponse,
    AuthUserSchema,
} from '@/entities/Auth';

const AuthRefreshTest = () => {
    const [refreshAuth, { isLoading, error }] = useRefreshAuthMutation();
    const authUser = useSelector((state: { authUser: AuthUserSchema }) =>
        selectAuthUserState(state),
    );
    const [response, setResponse] = useState<AccessTokenInfoResponse | null>(null);
    const [refreshToken, setRefreshToken] = useState('');
    const [storedReduxState, setStoredReduxState] = useState<string | null>(null);

    const handleRefresh = async () => {
        try {
            const refreshResponse = await refreshAuth({ refreshToken }).unwrap();
            setResponse(refreshResponse);
        } catch {
            setResponse(null);
        } finally {
            setStoredReduxState(localStorage.getItem('persist:root'));
        }
    };

    return (
        <section>
            <h2>Auth refresh test</h2>
            <label htmlFor="refresh-token">Refresh token</label>
            <input
                id="refresh-token"
                type="text"
                required
                value={refreshToken}
                onChange={(event) => setRefreshToken(event.target.value)}
            />
            <br />
            <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading || !refreshToken}
            >
                {isLoading ? 'Refreshing...' : 'Refresh auth'}
            </button>
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            <br />
            <h3>Redux auth state</h3>
            <pre>{JSON.stringify(authUser, null, 2)}</pre>
            <br />
            <h3>localStorage persisted Redux state after request</h3>
            <pre>{storedReduxState ?? 'No localStorage snapshot yet'}</pre>
            <br />
        </section>
    );
};

export default AuthRefreshTest;
