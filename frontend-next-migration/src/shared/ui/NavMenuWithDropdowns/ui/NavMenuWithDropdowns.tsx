import { DropDownElement, DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { DropDownElementASTextOrLink } from '@/shared/ui/DropdownWrapper/types';
import { ReactNode } from 'react';
import cls from './NavMenuWithDropdowns.module.scss';

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

interface NavMenuWithDropdownsProps {
    dropdownItems: {
        title: string;
        elements: DropDownElementASTextOrLink[];
        openByDefault?: boolean;
    }[];
    children: ReactNode;
}

export function NavMenuWithDropdowns({ dropdownItems, children }: NavMenuWithDropdownsProps) {
    return (
        <div
            style={{
                minHeight: '500px',
                width: '100%',
                maxWidth: '950px',
            }}
        >
            <DropdownWrapper
                openByDefault={true}
                elements={dropdownItems.map((item, index) => (
                    <NestedDropDown
                        key={index}
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
                {children}
            </DropdownWrapper>
        </div>
    );
}
