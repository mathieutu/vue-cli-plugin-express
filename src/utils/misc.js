export const coalesce = (...args) => {
  for (const key in args) {
    if (args[key] != null) {
      return args[key];
    }
  }

  return null;
};
