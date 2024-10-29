// import { CustomEditor } from '@/shared/ui/CustomEditor';
import { NavMenuWithDropdowns, NavMenuWithDropdownsProps } from '@/shared/ui/NavMenuWithDropdowns';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

const Page = () => {
    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: 'Forum',
        openByDefault: true,
        dropdownItems: [
            {
                title: 'Heroes',
                openByDefault: false,
                elements: [
                    // links can be used as well, just add the "link" to object
                    {
                        elementText: 'Hero 1',
                        id: 'hero1',
                        link: { path: RoutePaths.HEROES, isExternal: false },
                    },
                    { elementText: 'Hero 2', id: 'hero2' },
                ],
            },
            {
                title: 'News',
                openByDefault: false,
                elements: [
                    {
                        elementText: 'Piece of news 1',
                        id: 'news1',
                        link: {
                            path: 'https://gamerant.com/capcom-reports-high-pc-sales/',
                            isExternal: true,
                        },
                    },
                    { elementText: 'Piece of news 2', id: 'news2' },
                    { elementText: 'Piece of news 3', id: 'news3' },
                ],
            },
        ],
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '200px',
            }}
        >
            {/*better to use className for that, inline styled used only for testing*/}
            <div style={{ width: '100%', maxWidth: '950px' }}>
                <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
            </div>

            {/*<NavigationDropdown menuItems={menuData}/>*/}
        </div>
    );
};

export default Page;

{
    /*<CustomEditor.CreateNewMode entityName={'News_Blog'} />*/
}
