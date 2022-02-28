import { describe } from 'jest-circus';
import { validateRGH } from './Form.js';

describe('Form logic', () => {
  test('should validate RGH', () => {
    const rgh = '14259401E';
    const rgh2 = '13817615A';
    const wrongRgh = '12345678A';
    const hospital = 'Hospital das Clínicas';
    const hospital2 = 'other';
  
    expect(validateRGH(hospital, rgh)).toBe(true);
    expect(validateRGH(hospital, rgh2)).toBe(true);
    expect(validateRGH(hospital2, wrongRgh)).toBe(true);
    expect(validateRGH(hospital, wrongRgh)).toBe(false);
  });
});
