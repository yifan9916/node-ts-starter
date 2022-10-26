module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*(*.)@(spec|test).(ts|js)',
    '<rootDir>/__tests__/**/*(*.)@(spec|test).(ts|js)',
  ],
  testEnvironment: 'node',
};
