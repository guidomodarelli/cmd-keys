/** @returns {Promise<import('jest').Config>} */
export default async () => {
  return {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: [
      "**/__tests__/**/*.(spec|test).[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
  };
};
