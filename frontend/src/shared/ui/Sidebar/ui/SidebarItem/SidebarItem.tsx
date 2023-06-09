import {AppLink, AppLinkTheme} from '@/shared/ui/AppLink/AppLink';
import {memo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import {ISidebarItem, sidebarItemType} from '../../model/items';
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";

interface SidebarItemProps {
    item: ISidebarItem;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {

    if (item.type === sidebarItemType.ISidebarItemBasic) {
        return (
            <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={item.path}
                className={classNames(cls.item, { [cls.collapsed]: collapsed })}
            >
                <span className={cls.link}>{item.name}</span>
            </AppLink>
        );
    }

    if (item.type === sidebarItemType.ISidebarItemDropDown) {
        // return <div className={cls.item + " "+  cls.link}>hhsa</div>
        // return <DropdownWrapper className={cls.link} contentClassName={classNames(cls.item, { [cls.collapsed]: collapsed })} elements={item.elements}> {item.name} </DropdownWrapper>;
        return <DropdownWrapper className={cls.link} contentItemClassName={cls.item} contentClassName={classNames(cls.link, { [cls.collapsed]: collapsed })} elements={item.elements}> {item.name} </DropdownWrapper>;
        // return (
        //     <AppLink
        //         theme={AppLinkTheme.PRIMARY}
        //         to={item.elements[0].link.path}
        //         className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        //     >
        //         lol
        //         {/*<span className={cls.link}>{item.name}</span>*/}
        //     </AppLink>
        // )
    }
    return null;
});