import { cn } from './utils';

describe('cn util function', () => {
  it('should return a single class name', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('should merge multiple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should return empty string if no class names are provided', () => {
    expect(cn()).toBe('');
  });

  it('should handle falsy, null, and undefined values', () => {
    expect(cn('class1', false, 'class2', null, undefined)).toBe(
      'class1 class2',
    );
  });

  it('should handle false condition class names', () => {
    const isActive = false;
    expect(cn('class1', isActive && 'class2')).toBe('class1');
  });

  it('should handle true condition class names', () => {
    const isActive = true;
    expect(cn('class1', isActive && 'class2')).toBe('class1 class2');
  });

  it('should merge class names with tailwind-merge', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('should merge class names with tailwind-merge and clsx', () => {
    expect(cn('p-2', 'p-4', 'text-center')).toBe('p-4 text-center');
  });

  it('should resolve text color conflicts with tailwind-merge', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should not delete unique class names when merging', () => {
    expect(cn('p-2', 'text-center')).toBe('p-2 text-center');
  });

  it('should work object syntax from clsx', () => {
    expect(cn({ class1: true, class2: false, class3: true })).toBe(
      'class1 class3',
    );
  });

  it('should work array syntax from clsx', () => {
    expect(cn(['class1', false, 'class2', null, 'class3'])).toBe(
      'class1 class2 class3',
    );
  });

  it('should work for button variant example (real example)', () => {
    const isPrimary = true;
    const isDisabled = false;
    expect(
      cn(
        'px-4 py-2 rounded',
        isPrimary ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black',
        isDisabled && 'opacity-50 cursor-not-allowed',
      ),
    ).toBe('px-4 py-2 rounded bg-blue-500 text-white');
  });
});
