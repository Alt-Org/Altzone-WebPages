export default function Loading() {
    return (
        <div
            aria-live="polite"
            aria-busy="true"
            style={{
                display: 'grid',
                placeItems: 'center',
                height: '50vh',
                fontSize: '1rem',
            }}
        >
            Loading…
        </div>
    );
}
