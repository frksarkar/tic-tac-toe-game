/** @type {import('ts-jest').JestConfigWithTsJest} **/
// jest.config.js
// jest.config.js
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	collectCoverage: true, // Enable coverage collection
	coverageDirectory: 'coverage', // Output directory for coverage reports
	coverageReporters: ['text', 'html'], // Report formats
};
