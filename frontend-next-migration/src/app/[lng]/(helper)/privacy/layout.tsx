import { ReactNode } from 'react';
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
