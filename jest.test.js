export default {
  transform: { "^.+\\.jsx?$": "babel-jest" },
  extensionsToTreatAsEsm: [".jsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
