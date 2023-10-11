import {Component, ComponentType, createRef} from 'react';
import cls from "./withBackgroundImage.module.scss";

function withBackgroundImage(WrappedComponent: ComponentType<any>, imagePath: string) {
    return class extends Component {
        private backgroundDiv = createRef<HTMLDivElement>();

        componentDidMount() {
            if (this.backgroundDiv.current) {
                this.backgroundDiv.current.style.backgroundImage = `url(${imagePath})`;
            }
        }

        render() {
            return (
                <>
                    <div className={cls.Background} ref={this.backgroundDiv} />
                    <div className={cls.Content}>
                        <WrappedComponent {...this.props} />
                    </div>
                </>
            );
        }
    };
}

export default withBackgroundImage;

