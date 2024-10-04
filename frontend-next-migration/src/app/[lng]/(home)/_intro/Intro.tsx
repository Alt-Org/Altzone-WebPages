import cls from "./Intro.module.scss";
import {Button, ButtonTheme} from "@/shared/ui/Button";

type Props = {
    scrollToContent: () => void;
};

const Intro = (props: Props) => {
    const { scrollToContent } = props;
    return (
        <div className={cls.intro}>
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
};

Intro.displayName = "IntroComponent";

export default Intro;