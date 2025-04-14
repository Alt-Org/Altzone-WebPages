import { useState, useEffect } from 'react';

interface NavbarLink {
    label: string;
    href: string;
}

export const useNavbarLinks = () => {
    const [links, setLinks] = useState<NavbarLink[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('/api/nav-links');
                const data = await response.json();
                setLinks(data);
            } catch (error) {
                setLinks([
                    { label: 'Home', href: '/' },
                    { label: 'About', href: '/about' },
                ]);
            }
        };
        fetchLinks();
    }, []);

    return links;
};
