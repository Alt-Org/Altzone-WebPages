import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectDescription, Props } from './ProjectDescription';

// Mock IntersectionObserver
beforeAll(() => {
  class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    constructor(_: IntersectionObserverCallback, __?: IntersectionObserverInit) {}
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return []; }
  }
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
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