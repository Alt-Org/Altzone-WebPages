import { fireEvent, render, screen } from '@testing-library/react';
import type { ImageProps } from 'next/image';
import { ComicReader } from './ComicReader';

jest.mock('@/shared/i18n', () => ({ useClientTranslation: jest.fn() }));
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, sizes, loading, fetchPriority, priority }: ImageProps) => (
        <img
            src={src as string}
            alt={alt}
            sizes={sizes}
            loading={loading}
            data-fetch-priority={fetchPriority}
            data-priority={priority}
        />
    ),
}));

const previewImage = (name: string) => screen.getAllByAltText(name)[0];

describe('ComicReader', () => {
    it('loads only the cover and next two images while the modal is closed', () => {
        render(
            <ComicReader
                cover={{ name: 'Comic', url: '/assets/cover' }}
                sources={Array.from({ length: 8 }, (_, index) => `/assets/page-${index + 1}`)}
            />,
        );

        expect(screen.getAllByAltText('Comic')).toHaveLength(2);
        expect(screen.getAllByAltText('Page 1')).toHaveLength(2);
        expect(screen.getAllByAltText('Page 2')).toHaveLength(2);
        expect(screen.queryByAltText('Page 3')).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole('slider', { hidden: true }), { target: { value: '1' } });

        expect(previewImage('Page 1')).toBeVisible();
        expect(previewImage('Page 2')).toBeVisible();
        expect(previewImage('Page 3')).not.toBeVisible();
        expect(previewImage('Page 4')).not.toBeVisible();
        expect(screen.queryByAltText('Page 5')).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole('slider', { hidden: true }), { target: { value: '2' } });

        expect(previewImage('Page 3')).toBeVisible();
        expect(previewImage('Page 4')).toBeVisible();
        expect(previewImage('Page 5')).not.toBeVisible();
        expect(previewImage('Page 6')).not.toBeVisible();
        expect(screen.queryByAltText('Page 7')).not.toBeInTheDocument();
    });

    it('loads the current mobile page and next two images after navigation', () => {
        const originalWidth = window.innerWidth;
        window.innerWidth = 640;

        try {
            render(
                <ComicReader
                    cover={{ name: 'Comic', url: '/assets/cover' }}
                    sources={Array.from({ length: 5 }, (_, index) => `/assets/page-${index + 1}`)}
                />,
            );

            fireEvent.change(screen.getByRole('slider', { hidden: true }), {
                target: { value: '1' },
            });

            expect(previewImage('Page 1')).toBeVisible();
            expect(previewImage('Page 2')).not.toBeVisible();
            expect(previewImage('Page 3')).not.toBeVisible();
            expect(screen.queryByAltText('Page 4')).not.toBeInTheDocument();
        } finally {
            window.innerWidth = originalWidth;
        }
    });

    it('prioritizes covers and preloads the first modal spread at low priority before opening', () => {
        render(
            <ComicReader
                cover={{ name: 'Comic', url: '/assets/cover' }}
                sources={['/assets/page-1', '/assets/page-2', '/assets/page-3']}
            />,
        );

        const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;
        dialog.showModal = jest.fn(() => dialog.setAttribute('open', ''));
        dialog.close = jest.fn(() => dialog.removeAttribute('open'));

        for (const coverImage of screen.getAllByAltText('Comic')) {
            expect(coverImage).toHaveAttribute('data-priority', 'true');
            expect(coverImage).toHaveAttribute('data-fetch-priority', 'high');
        }
        expect(screen.getAllByAltText('Comic')[1]).toHaveAttribute('sizes', '100vw');
        expect(screen.getAllByAltText('Comic')[1]).not.toBeVisible();

        for (const name of ['Page 1', 'Page 2']) {
            const modalImage = screen.getAllByAltText(name)[1];
            expect(modalImage).toHaveAttribute('sizes', '100vw');
            expect(modalImage).toHaveAttribute('loading', 'eager');
            expect(modalImage).toHaveAttribute('data-fetch-priority', 'low');
            expect(modalImage).not.toBeVisible();
        }
        expect(screen.queryByAltText('Page 3')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Zoom' }));

        expect(screen.getAllByAltText('Comic')).toHaveLength(2);
        expect(screen.getAllByAltText('Comic')[1]).toBeVisible();
        expect(screen.getAllByAltText('Comic')[1]).toHaveAttribute('data-fetch-priority', 'high');
        expect(screen.getAllByAltText('Page 1')).toHaveLength(2);
        expect(screen.getAllByAltText('Page 2')).toHaveLength(2);
        expect(screen.queryByAltText('Page 3')).not.toBeInTheDocument();

        fireEvent.click(dialog);
        expect(screen.getAllByAltText('Comic')[1]).not.toBeVisible();
        expect(screen.getAllByAltText('Comic')[1]).toHaveAttribute('data-fetch-priority', 'high');
    });
});
