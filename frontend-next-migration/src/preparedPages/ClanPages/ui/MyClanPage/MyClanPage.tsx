'use client'
import { selectClanId } from "@/entities/Auth/model/authUserSlice";
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



const MyClanPage = () => {
    const router = useRouter();
    const clanId = useSelector(selectClanId);

    useEffect(() => {
        if (clanId) {
            // console.log(clanId);
            router.push('/clans/' + clanId);
        } else {
            router.push('/clans/all');
        }
    });
};

export default MyClanPage;