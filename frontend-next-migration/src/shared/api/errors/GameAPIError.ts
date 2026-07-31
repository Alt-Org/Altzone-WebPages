import { captureException } from '@sentry/nextjs';

/**
 * Error that happens during a game API call
 */
export class GameAPIError extends Error {
    constructor({ url, method, status }: GameAPIErrorInfo) {
        super(`Game API request failed ${method} /${url} ${status}`);
        this.url = url;
        this.method = method;
        this.status = status;
        this.name = GameAPIError.name;
    }

    public readonly url: string | undefined;
    public readonly method: string | undefined;
    public readonly status:
        | number
        | 'FETCH_ERROR'
        | 'PARSING_ERROR'
        | 'TIMEOUT_ERROR'
        | 'CUSTOM_ERROR'
        | undefined;

    public addSpanWithErrorInfo(): void {
        captureException(this, {
            extra: {
                'request.game-api.url': `/${this.url}`,
                'request.game-api.method': this.method,
                'response.game-api.status': this.status,
            },
        });
    }
}

type GameAPIErrorInfo = {
    /**
     * Request URL
     */
    url: string | undefined;
    /**
     * Request method
     */
    method: string | undefined;
    /**
     * Response status code or string value from FetchBaseQueryError
     */
    status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR' | undefined;
};
