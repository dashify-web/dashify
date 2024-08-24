export const undefinedContextMessage = (
  hookName: string,
  contextName: string
) => `${hookName} must be wrapped by ${contextName}`;
