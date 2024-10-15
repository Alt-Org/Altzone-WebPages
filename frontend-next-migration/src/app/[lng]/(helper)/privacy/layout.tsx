import { ReactNode } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';

type Props = {
  children: ReactNode;
};

export default function PrivacyLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
