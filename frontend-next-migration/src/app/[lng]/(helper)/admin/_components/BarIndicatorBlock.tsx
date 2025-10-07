import { BarIndicator } from '@/shared/ui/v2/BarIndicator';

const BarIndicatorBlock = () => {
    return (
        <div
            style={{
                background: 'var(--base-card-background)',
                paddingBottom: '1.5em',
                marginTop: '1em',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: 'fit-content',
                    padding: '2em',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                <BarIndicator
                    label={'Speed'}
                    value={5}
                    maxValue={20}
                    developmentThreshold={'Kokenut'}
                />
                <BarIndicator
                    label={'HP'}
                    value={'-'}
                    developmentThreshold={'Harjoittelija'}
                />
                <BarIndicator
                    label={'strike'}
                    value={12}
                    maxValue={14}
                    developmentThreshold={'Konkari'}
                />
                <BarIndicator
                    label={'size'}
                    value={8}
                    developmentThreshold={'Kokenut'}
                />
                <BarIndicator
                    label={'resistance'}
                    value={16}
                    maxValue={23}
                    developmentThreshold={'Aloittelija'}
                />
                <BarIndicator
                    value={14}
                    maxValue={20}
                />
            </div>
        </div>
    );
};

export default BarIndicatorBlock;
