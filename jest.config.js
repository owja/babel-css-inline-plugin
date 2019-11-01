module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: [
        "<rootDir>/src"
    ],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/test/**",
    ],
    coverageReporters: [
        "text-summary",
        "html",
    ],
    coverageDirectory: "./coverage/",
    collectCoverage: true,
    moduleDirectories: [
        "src",
        "node_modules",
    ],
    moduleFileExtensions: [
        "ts",
        "js",
    ],
};
