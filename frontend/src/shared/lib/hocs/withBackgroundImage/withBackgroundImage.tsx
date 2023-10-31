    import {Component, ComponentType, createRef} from 'react';
    import cls from "./withBackgroundImage.module.scss";

    //
    // function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
    //     return class extends Component<P> {
    //         private backgroundDiv = createRef<HTMLDivElement>();
    //
    //         componentDidMount() {
    //             if (this.backgroundDiv.current) {
    //                 this.backgroundDiv.current.style.backgroundImage = `url(${imagePath})`;
    //             }
    //
    //         }
    //
    //         render() {
    //             return (
    //                 <>
    //                     <div className={cls.Background} ref={this.backgroundDiv} />
    //                     <div className={cls.Content}>
    //                         <WrappedComponent {...this.props} />
    //                     </div>
    //                 </>
    //             );
    //         }
    //     };
    // }

    function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
        return class extends Component<P> {

            render() {
                return (
                    <>
                        <div className={cls.Background} style={{ backgroundImage: `url(${imagePath})` }} />
                        <div className={cls.Content}>
                            <WrappedComponent {...this.props} />
                        </div>
                    </>
                );
            }
        };
    }


    export default withBackgroundImage;

