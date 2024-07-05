// Mocking the next/image for Jest tests

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import withBackgroundImage from './withBackgroundImage';

describe('withBackgroundImage', () => {
  const WrappedComponent: React.FC = () => <div>Test</div>;
  const config = {
    imagePath: '/path/to/image',
    placeHolderPath: '/path/to/placeholder',
    alt: 'test',
    shouldBeLazyLoaded: true,
    className: 'test-class',
  };
  test('returns a function that renders a component with a lazy loaded background image', () => {
    const config2 = { ...config, shouldBeLazyLoaded: true};
    const WithBackgroundComponentLazy = withBackgroundImage(config2)(WrappedComponent);
    render(<WithBackgroundComponentLazy />);
    const elementLazy = screen.getByRole('img');
    expect(elementLazy).toHaveAttribute('loading', 'lazy');
  });
});