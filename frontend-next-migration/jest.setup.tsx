import '@testing-library/jest-dom';

jest.mock('next/image', () => {
    // @ts-ignore
    const MockImage = ({ src, alt, width = 24, height = 24 }) => (
        // eslint-disable-next-line @next/next/no-img-element -- Replace next/image with a plain image in tests.
        <img
            src={src}
            alt={alt}
            style={{ width, height }}
        />
    );
    MockImage.displayName = 'MockImage'; // Set the display name
    return MockImage;
});
