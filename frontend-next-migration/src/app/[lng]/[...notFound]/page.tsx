'use client';
// import { useEffect } from 'react';
import { useParams, redirect } from 'next/navigation';

export default function NotFoundCatchAll() {
    const params = useParams();

    if (params?.lng) {
        redirect(`/${params.lng}/coming`);
    }

    return null;
}
