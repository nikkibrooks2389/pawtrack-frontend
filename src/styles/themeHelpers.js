export const color = (key) => ({ theme }) => theme.colors[key];
export const breakpoint = (key) => ({ theme }) => `(max-width: ${theme.breakpoints[key]})`;