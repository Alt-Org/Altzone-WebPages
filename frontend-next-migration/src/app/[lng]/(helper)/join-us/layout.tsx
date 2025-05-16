import React from 'react';
import styles from './joinUsLayout.module.scss';

export default function JoinUsLayout({ children }: { children: React.ReactNode }) {
    return <div className={styles.joinUsLayout}>{children}</div>;
}
