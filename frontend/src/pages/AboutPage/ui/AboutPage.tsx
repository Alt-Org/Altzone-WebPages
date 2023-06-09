import {Navbar} from "@/widgets/Navbar";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./AboutPage.module.scss";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {DropDownElement, DropdownWrapper} from "@/shared/ui/DropdownWrapper";


const AboutPage = () => {

    const dropdownElements: DropDownElement[] = [
        {
            id: '1',
            elementText: 'Option 1',
            onClickCallback: () => {
                console.log('Option 1 clicked!');
            },
            link:  {
                isExternal: true,
                path: "google.com"
            }
        },
        {
            id: '2',
            elementText: 'Option 2',
            onClickCallback: () => {
                console.log('Option 2 clicked!');
            },
            link:  {
                isExternal: true,
                path: "google.com"
            }
        },
    ];

    return (
        <div className={classNames(cls.AboutPage)}>
            <FeedbackSideButton/>
            <Navbar className={cls.navbar}/>
            <h1>About page</h1>

            <DropdownWrapper elements={dropdownElements}>
                <div>press me</div>
            </DropdownWrapper>


        </div>
    );
};

export default AboutPage;
