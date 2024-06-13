import { CustomEditor } from "@/shared/ui/CustomEditor";

const Page = () => {
    return (
        <div style={{ backgroundColor: 'white', color: 'black' }}>
            <CustomEditor.CreateNewMode entityName={"News_Blog"}/>
        </div>
    );
};

export default Page;
