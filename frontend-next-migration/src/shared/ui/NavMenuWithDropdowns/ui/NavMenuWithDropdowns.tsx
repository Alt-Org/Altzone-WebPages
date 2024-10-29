import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import cls from './NavMenuWithDropdowns.module.scss';

function Heroes() {
    return (
        <DropdownWrapper
            className={cls.subDropDown}
            contentClassName={cls.subDropDownContent}
            childrenWrapperClassName={cls.subDropDownChildren}
            elements={[<div key={'sdasd'}>Hero 1</div>, <div key={'sadads'}>Hero 2</div>]}
        >
            Heroes
        </DropdownWrapper>
    );
}

function News() {
    return (
        <DropdownWrapper
            className={cls.subDropDown}
            contentClassName={cls.subDropDownContent}
            childrenWrapperClassName={cls.subDropDownChildren}
            elements={[
                <div key={'sdasdasdd'}>Piece of news 1</div>,
                <div key={'dasddasda'}>Piece of news 2</div>,
                <div key={'dasddasda'}>Piece of news 3</div>,
            ]}
        >
            News
        </DropdownWrapper>
    );
}

export function NavMenuWithDropdowns() {
    return (
        <div
            style={{
                minHeight: '500px',
                width: '100%',
                maxWidth: '950px',
                display: 'flex',
                alignItems: 'flex-start',
            }}
        >
            <DropdownWrapper
                elements={[<Heroes key={'some'} />, <News key={'asdasdads'} />]}
                className={cls.topDropDown}
                childrenWrapperClassName={cls.topDropDownChildren}
                contentClassName={cls.topDropDownContent}
            >
                Forums
            </DropdownWrapper>
        </div>
    );
}
