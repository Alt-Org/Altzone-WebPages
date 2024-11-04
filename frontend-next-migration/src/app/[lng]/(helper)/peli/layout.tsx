import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function GameLayout({ children }: Props) {
    return (
        <>
            <div style={{ paddingTop: '20px' }} />
            {children}
        </>
    );
}
