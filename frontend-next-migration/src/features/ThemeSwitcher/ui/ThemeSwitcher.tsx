import { useTheme, Theme } from '@/app/_providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import Image from 'next/image';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? (
                <Image
                    data-testid="dark-icon"
                    src={DarkIcon}
                    alt="dark icon"
                />
            ) : (
                <Image
                    data-testid="light-icon"
                    src={LightIcon}
                    alt="light icon"
                />
            )}
        </Button>
    );
};
