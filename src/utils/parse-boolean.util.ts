export const parseBoolean = (value: unknown) => {
  try {
    // @ts-expect-error
    return JSON.parse(value ?? "false");
  } catch (err) {
    return false;
  }
};
