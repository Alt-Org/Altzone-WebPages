import { classNames } from "@/shared/lib/classNames/classNames";
import { Theme, useTheme } from "@/preparedApp/providers/ThemeProvider";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className= '' }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon data-testid="dark-icon" /> : <LightIcon data-testid="light-icon" />}
        </Button>
    );
};
