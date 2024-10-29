// import { CustomEditor } from '@/shared/ui/CustomEditor';
import { NavMenuWithDropdowns } from '@/shared/ui/NavMenuWithDropdowns';

const Page = () => {
    const dropdownItems = [
        {
            title: 'Heroes',
            openByDefault: false,
            elements: [
                { elementText: 'Hero 1', id: 'hero1' },
                { elementText: 'Hero 2', id: 'hero2' },
            ],
        },
        {
            title: 'News',
            openByDefault: false,
            elements: [
                { elementText: 'Piece of news 1', id: 'news1' },
                { elementText: 'Piece of news 2', id: 'news2' },
                { elementText: 'Piece of news 3', id: 'news3' },
            ],
        },
    ];

    return (
        <div
            style={{
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '200px',
            }}
        >
            {/*better to use className for such, inline styled used only for testing*/}
            <div style={{ width: '100%', maxWidth: '950px' }}>
                <NavMenuWithDropdowns
                    dropdownItems={dropdownItems}
                    title={'Forums'}
                />
            </div>

            {/*<NavigationDropdown menuItems={menuData}/>*/}
        </div>
    );
};

export default Page;

{
    /*<CustomEditor.CreateNewMode entityName={'News_Blog'} />*/
}
