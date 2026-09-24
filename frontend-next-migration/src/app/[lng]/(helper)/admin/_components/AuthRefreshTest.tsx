'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAuthUserState,
    useRefreshAuthMutation,
    AccessTokenInfoResponse,
    AuthUserSchema,
} from '@/entities/Auth';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const AuthRefreshTest = () => {
    const [refreshAuth, { isLoading, error }] = useRefreshAuthMutation();
    const authUser = useSelector((state: { authUser: AuthUserSchema }) =>
        selectAuthUserState(state),
    );
    const [response, setResponse] = useState<AccessTokenInfoResponse | null>(null);
    const [storedAuthUser, setStoredAuthUser] = useState<string | null>(null);

    const handleRefresh = async () => {
        try {
            const refreshResponse = await refreshAuth().unwrap();
            setResponse(refreshResponse);
            setStoredAuthUser(localStorage.getItem(LS_KEYS.AUTH_USER));
        } catch {
            setResponse(null);
            setStoredAuthUser(localStorage.getItem(LS_KEYS.AUTH_USER));
        }
    };

    return (
        <section>
            <h2>Auth refresh test</h2>
            <br />
            <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading}
            >
                {isLoading ? 'Refreshing...' : 'Refresh auth'}
            </button>
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            <br />
            <h3>Redux auth state</h3>
            <pre>{JSON.stringify(authUser, null, 2)}</pre>
            <br />
            <h3>localStorage AuthUser after request</h3>
            <pre>{storedAuthUser ?? 'No localStorage snapshot yet'}</pre>
            <br />
        </section>
    );
};

export default AuthRefreshTest;
