export default function Loading() {
    return (
        <div
            role="status"
            aria-busy="true"
            aria-live="polite"
            style={{ padding: '1rem' }}
        >
            Loading…
        </div>
    );
}
