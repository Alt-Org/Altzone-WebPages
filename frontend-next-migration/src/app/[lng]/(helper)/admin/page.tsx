// import { CustomEditor } from '@/shared/ui/CustomEditor';
import { MenuItem, NavigationDropdown } from '@/shared/ui/NavigationDropdown';

const menuData: MenuItem[] = [
    {
        id: '1',
        elementText: 'Главная',
        link: { path: '/', isExternal: false },
    },
    {
        id: '2',
        elementText: 'О нас',
        children: [
            {
                id: '2-1',
                elementText: 'Наша команда',
                link: { path: '/team', isExternal: false },
            },
            // {
            //     id: '2-2',
            //     elementText: 'Карьера',
            //     children: [
            //         {
            //             id: '2-2-1',
            //             elementText: 'Вакансии',
            //             link: { path: '/careers/jobs', isExternal: false },
            //         },
            //     ],
            // },
        ],
    },
    {
        id: '3',
        elementText: 'Контакты',
        link: { path: '/contact', isExternal: false },
    },
];

const Page = () => {
    return (
        <div
            style={{
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/*<CustomEditor.CreateNewMode entityName={'News_Blog'} />*/}

            <div style={{ marginTop: '400px' }} />

            {/*<NavigationDropdown menuItems={menuData}/>*/}
        </div>
    );
};

export default Page;
