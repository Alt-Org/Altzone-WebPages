import cls from './BarIndicator.module.scss';

interface BarIndicatorProps {
    value: number;
    maxValue?: number;
    label?: string;
}

const BarIndicator = ({ value, maxValue = 24, label }: BarIndicatorProps) => {
    const base: number[] = Array(24).fill(0);

    return (
        <div className={cls.barIndicatorContainer}>
            {base.map((_, index) => (
                <div
                    key={index}
                    className={cls.bar}
                />
            ))}
        </div>
    );
};

export default BarIndicator;
