import { undefinedContextMessage } from '../../lib/messages';

describe('undefinedContext', () => {
  it('should return the correct string', () => {
    const hookName = 'useMyHook';
    const contextName = 'MyContext';
    const result = undefinedContextMessage(hookName, contextName);

    expect(result).toBe('useMyHook must be wrapped by MyContext');
  });
});
