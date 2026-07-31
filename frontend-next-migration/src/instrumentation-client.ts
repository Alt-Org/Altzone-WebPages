// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Define how likely traces are sampled. Adjust this value in production or use tracesSampler for greater control.
    tracesSampleRate: Number.parseFloat(process.env.NEXT_PUBLIC_SENTRY_RATE ?? '0.1'),

    dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
    },

    tracePropagationTargets: [process.env.NEXT_PUBLIC_API_LINK ?? ''],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
