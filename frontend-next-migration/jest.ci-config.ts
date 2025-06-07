import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import dotenv from 'dotenv';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

dotenv.config({ path: '.env.local' });

/**
 * Config for CI / CD pipeline
 */
const config: Config = {
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    rootDir: '.',
    clearMocks: true,
    moduleDirectories: ['node_modules', __dirname],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    testEnvironment: 'jsdom',

    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['cobertura'],
    reporters: ['jest-junit'],

    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
