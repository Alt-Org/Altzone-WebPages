import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import cls from './NavMenuWithDropdowns.module.scss';

function Test() {
    return (
        <div style={{ color: 'greenyellow', fontSize: '24px', justifySelf: 'self-start' }}>
            <DropdownWrapper
                elements={[<div key={'sdasd'}>Hero 1</div>, <div key={'sadads'}>Hero 2</div>]}
            >
                Heroes
            </DropdownWrapper>
        </div>
    );
}

export function NavMenuWithDropdowns() {
    return (
        <div
            style={{
                color: 'red',
                minHeight: '200px',
                // display: "flex",
                // justifyContent: "center",
                width: '500px',
                fontSize: '40px',
            }}
        >
            <DropdownWrapper
                elements={[<Test key={'some'} />]}
                className={cls.topDropDown}
                childrenWrapperClassName={cls.topDropDownChildren}
            >
                Forums
            </DropdownWrapper>
        </div>
    );
}
