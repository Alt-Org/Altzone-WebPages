import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {MembersSection} from "@/widgets/MembersSection";
import {classNames} from "@/shared/lib/classNames/classNames";
import backgroundImg from '@/shared/assets/images/clanBg/space.webp'
const backgroundImgHolder = "/preloads/space.webp";


import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import {ScrollTop} from "@/features/ScrollTop";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            {/*<div className={cls.backgroundOpacity}></div>*/}
            <div className={cls.navbarWrapper}>
            <Navbar overlayed={true} className={cls.navbar}/>
            </div>
            <MembersSection  className={cls.workersSection}/>
            <ScrollTop/>
        </div>
    );
};



export default withBackgroundImage({
    WrappedComponent: MembersPage,
    alt: "Members-Page space background",
    imagePath: backgroundImg,
    placeHolderPath: backgroundImgHolder,
    shouldBeLazyLoaded: true
});


