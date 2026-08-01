import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('объединяет классы и исключает ложные значения', () => {
    expect(cn('card', false, undefined, 'card_active')).toBe(
      'card card_active',
    );
  });
});