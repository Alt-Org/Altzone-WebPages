import '@testing-library/jest-dom';

jest.mock('next/image', () => {
    // @ts-ignore
    return ({ src, alt, width = 24, height = 24 }) => (
        <img
            src={src}
            alt={alt}
            style={{ width, height }}
        />
    );
});
