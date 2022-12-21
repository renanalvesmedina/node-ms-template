module.exports = {
    roots: ['<rootDir>'],
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']    
}