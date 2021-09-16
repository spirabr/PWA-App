import { validateRGH, todaysDate } from './Form.js';

test('should validate RGH', () => {
    const rgh = '14259401E';
    const rgh2 = '13817615A';
    const wrongRgh = '12345678A';
    const hospital = 'Hospital das Clínicas';

    expect(validateRGH(hospital, rgh)).toBe(true);
    expect(validateRGH(hospital, rgh2)).toBe(true);
    expect(validateRGH(hospital, wrongRgh)).toBe(false);
})

test('should return the todays date', () => {
    expect(todaysDate()).toMatch(/[0-3][0-9]\/[0-1][0-9]\/20[2-9][0-9]/);
})
