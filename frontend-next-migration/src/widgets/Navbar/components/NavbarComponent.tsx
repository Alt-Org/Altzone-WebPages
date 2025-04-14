import React from 'react';
import { useNavbarBuildBySize } from '../hooks/useNavbarConfig';

const NavbarComponent = () => {
    const navbarConfig = useNavbarBuildBySize('desktop');

    return (
        <nav className={`navbar ${navbarConfig.type}`}>
            <ul>
                {navbarConfig.links.map((link) => (
                    <li key={link.href}>
                        <a href={link.href}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavbarComponent;
