import { ReactNode } from 'react';
import { Property } from 'csstype';

interface LayoutDefaultProps {
    children: ReactNode;
    marginTop?: Property.MarginTop<string | number>;
}

const LayoutDefault = (props: LayoutDefaultProps) => {
    const { children, marginTop = '24vh' } = props;

    return <div style={{ marginTop }}>{children}</div>;
};

export default LayoutDefault;
