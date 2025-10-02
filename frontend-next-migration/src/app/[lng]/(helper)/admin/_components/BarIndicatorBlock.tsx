import { BarIndicator } from '@/shared/ui/v2/BarIndicator';

const BarIndicatorBlock = () => {
    return (
        <div style={{ background: 'var(--base-card-background)', paddingBottom: '1.5em' }}>
            <div style={{ width: '33%', height: '2em', padding: '2em' }}>
                <BarIndicator value={5} />
            </div>
        </div>
    );
};

export default BarIndicatorBlock;
