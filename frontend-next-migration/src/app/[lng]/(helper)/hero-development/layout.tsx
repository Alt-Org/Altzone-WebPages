import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function HeroDevelopmentLayout({ children }: Props) {
    return <> {children} </>;
}
