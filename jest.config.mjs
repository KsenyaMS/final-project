export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.mjs'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      "\\.css$": "jest-transform-css",
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
    },
    testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    testEnvironment: 'jest-fixed-jsdom',
  };