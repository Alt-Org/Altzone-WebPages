import {Navbar} from "@/widgets/Navbar";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./AboutPage.module.scss";

const AboutPage = () => {
    return (
        <div className={classNames(cls.AboutPage)}>
            <Navbar className={cls.navbar}/>
            <h1>About page</h1>
        </div>
    );
};

export default AboutPage;
