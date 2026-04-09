import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'components',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/__tests__/components/**/*.test.tsx'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/api/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
  ],
};

export default config;
