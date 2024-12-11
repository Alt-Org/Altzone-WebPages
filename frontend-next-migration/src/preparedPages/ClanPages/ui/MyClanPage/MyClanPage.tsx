'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectClanId } from '@/entities/Profile';

const MyClanPage = () => {
    const router = useRouter();
    const clanId = useSelector(selectClanId);

    useEffect(() => {
        if (clanId) {
            router.push('/clans/' + clanId);
        } else {
            router.push('/clans/all');
        }
    });
};

export default MyClanPage;
