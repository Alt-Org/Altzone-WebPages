import {forwardRef} from "react";
import {Button, ButtonTheme} from "@/shared/ui/Button";
import cls from "./Intro.module.scss";

type Props = {
    scrollToContent: () => void;
};

const Intro = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { scrollToContent } = props;
    return (
        <div ref={ref} className={cls.intro}>
            <h1>
                Welcome to our website!
            </h1>
            <p>
                Scroll down to see more
            </p>
            <Button
                onClick={scrollToContent}
                theme={ButtonTheme.Graffiti}
                withScalableLink
            >
                Scroll Down
            </Button>
        </div>
    );
});

Intro.displayName = "IntroComponent";

export default Intro;