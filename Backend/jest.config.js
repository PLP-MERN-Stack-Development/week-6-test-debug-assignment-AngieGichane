module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/models/',
    '/middlewares/'
  ],
  setupFilesAfterEnv: ['./jest.setup.js']
};