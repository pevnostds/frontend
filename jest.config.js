export default {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios)", 
    ],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
  };
  