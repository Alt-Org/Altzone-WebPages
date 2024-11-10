import { render, screen } from '@testing-library/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Title } from './Title';

// Mock the classNames utility function
jest.mock('@/shared/lib/classNames/classNames', () => ({
    classNames: jest.fn((baseClass, modifiers, additionalClasses) => {
        return [baseClass, ...additionalClasses].join(' '); // Simple mock implementation
    }),
}));

describe('Title', () => {
    it('renders without crashing', () => {
        render(<Title title="Non-Crashing Title" />);
        // If the component renders without throwing an error, the test will pass
    });

    it('renders the title correctly', () => {
        const testTitle = 'Test Title';
        render(<Title title={testTitle} />);

        const titleElement = screen.getByText(testTitle);
        expect(titleElement).toBeInTheDocument(); // Check that the title is rendered
    });

    it('applies the default class name', () => {
        render(<Title title="Default Title" />);

        const titleElement = screen.getByText('Default Title');
        expect(titleElement).toHaveClass('Title'); // Check that the default class is applied
    });

    it('applies additional class names when provided', () => {
        const additionalClass = 'custom-class';
        render(
            <Title
                title="Custom Class Title"
                className={additionalClass}
            />,
        );

        const titleElement = screen.getByText('Custom Class Title');
        expect(titleElement).toHaveClass('Title'); // Check the default class
        expect(titleElement).toHaveClass(additionalClass); // Check the additional class
    });
});
