import { truncateText } from './truncateText';

describe('truncateText', () => {
    it('should truncate a string that is longer than the maximum length and add an ellipsis', () => {
        const maxLength = 20;
        const truncate = truncateText(maxLength);
        const text = 'This is a long string that needs to be truncated';
        const expected = 'This is a long st...';
        const actual = truncate(text);
        expect(actual).toBe(expected);
    });

    it('should not modify a string that is shorter than or equal to the maximum length', () => {
        const maxLength = 20;
        const truncate = truncateText(maxLength);
        const text = 'Short string';
        const expected = text;
        const actual = truncate(text);
        expect(actual).toBe(expected);
    });

    it('should correctly handle a string that ends with a period', () => {
        const maxLength = 20;
        const truncate = truncateText(maxLength);
        const text = 'This is a long string.';
        const expected = 'This is a long st...';

        const actual = truncate(text);
        expect(actual).toBe(expected);
    });
});
