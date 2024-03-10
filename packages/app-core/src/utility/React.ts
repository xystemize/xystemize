export const createRef = <T>(instance?: T): { current: T | null } => {
  return { current: instance ?? null };
};
