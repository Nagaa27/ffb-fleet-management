// jest.config.js
module.exports = {
  preset: 'react-scripts',                    
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^axios$': '<rootDir>/__mocks__/axios.js' 
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)'                  
  ]
};
