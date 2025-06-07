import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectDescription, Props } from './ProjectDescription';

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
  };
});

describe('ProjectDescription', () => {
  const defaultProps: Props = {
    title: 'Test Title',
    description: 'This is a test description.',
    subDescription: 'This is a sub-description.',
  };

  it('renders the title, description and sub-description correctly', () => {
    render(<ProjectDescription {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subDescription!)).toBeInTheDocument();
  });
});