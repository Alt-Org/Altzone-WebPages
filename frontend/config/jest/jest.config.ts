// @ts-ignore
import path from "path";

// todo recognize how to change jest path in webstorm
export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    moduleDirectories: ['node_modules', 'src'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

    // The root directory that Jest should scan for tests and modules within
    rootDir: "../../",

    // The glob patterns Jest uses to detect test files
    // this is a custom variant to get tests work on mac and windows
    testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],

    // react testing library config
    setupFilesAfterEnv: ["<rootDir>config/jest/setupTests.ts"],

    moduleNameMapper: {
        "\\.svg": path.resolve(__dirname, "jestEmptyComponent.tsx"),
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        "^@/(.*)$": "<rootDir>/src/$1",
    },

}
