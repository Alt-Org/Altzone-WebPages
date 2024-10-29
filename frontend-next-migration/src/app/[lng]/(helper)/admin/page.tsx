// import { CustomEditor } from '@/shared/ui/CustomEditor';
import { NavMenuWithDropdowns } from '@/shared/ui/NavMenuWithDropdowns';

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

            <div style={{ marginTop: '700px' }} />

            <NavMenuWithDropdowns />
            {/*<NavigationDropdown menuItems={menuData}/>*/}
        </div>
    );
};

export default Page;
