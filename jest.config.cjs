module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^d3$': '<rootDir>/src/__mocks__/d3Mock.js',
    '^motion/react$': '<rootDir>/src/__mocks__/motionReact.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: false,
        tsconfig: { jsx: 'react-jsx', esModuleInterop: true },
      },
    ],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(?:@mui|@emotion|framer-motion|motion|d3|d3-.*)/)',
  ],
  maxWorkers: 2,
  workerIdleMemoryLimit: '512MB',
  clearMocks: true,
  testTimeout: 30000,
  collectCoverage: false,
  forceExit: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
