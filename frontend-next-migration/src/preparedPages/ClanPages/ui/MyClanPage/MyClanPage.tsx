'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectClanId } from "@/entities/Auth";

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