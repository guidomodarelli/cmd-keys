export const parseList = (value: unknown) => {
  try {
    // @ts-expect-error
    return JSON.parse(value ?? "[]");
  } catch (err) {
    return [];
  }
};
