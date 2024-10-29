import { DropDownElement, DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { DropDownElementASTextOrLink } from '@/shared/ui/DropdownWrapper/types';
import { ReactNode } from 'react';
import cls from './NavMenuWithDropdowns.module.scss';

export interface NavMenuWithDropdownsProps {
    dropdownItems: {
        title: string;
        elements: DropDownElementASTextOrLink[];
        openByDefault?: boolean;
    }[];
    openByDefault?: boolean;
    title: string;
    className?: string;
}

export function NavMenuWithDropdowns(props: NavMenuWithDropdownsProps) {
    const { dropdownItems, className, title, openByDefault = false } = props;

    return (
        <div className={className}>
            <DropdownWrapper
                openByDefault={openByDefault}
                elements={dropdownItems.map((item) => (
                    <NestedDropDown
                        key={item.title}
                        openByDefault={item.openByDefault}
                        elements={item.elements}
                    >
                        {item.title}
                    </NestedDropDown>
                ))}
                className={cls.topDropDown}
                childrenWrapperClassName={cls.topDropDownChildren}
                contentClassName={cls.topDropDownContent}
            >
                {title}
            </DropdownWrapper>
        </div>
    );
}

interface NestedDropDownProps {
    openByDefault?: boolean;
    elements: DropDownElement[];
    children: ReactNode;
}

function NestedDropDown(props: NestedDropDownProps) {
    const { openByDefault, elements, children } = props;

    return (
        <DropdownWrapper
            openByDefault={openByDefault}
            className={cls.subDropDown}
            contentClassName={cls.subDropDownContent}
            childrenWrapperClassName={cls.subDropDownChildren}
            elements={elements}
        >
            {children}
        </DropdownWrapper>
    );
}
