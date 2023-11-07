'use client'
// app/dashboard/[id].tsx
import {useParams} from 'next/navigation';
import {useSelector} from "react-redux";
import {selectProfile} from "@/entities/Auth";
import {useGetAllDirectoryPhotosQuery} from "@/entities/Gallery";

export default function DashboardPage() {

    const profile = useSelector(selectProfile);

    const test = useGetAllDirectoryPhotosQuery({parentDirectory: "comics"})

    console.log(test);


    const params = useParams()

    const id = params?.id;

    return <div>content from  id: {id}</div>;
}
