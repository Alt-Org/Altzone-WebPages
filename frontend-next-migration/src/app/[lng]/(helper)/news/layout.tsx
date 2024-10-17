import { ReactNode } from 'react';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

type Props = {
  children: ReactNode;
};

export default function NewsLayout({ children }: Props) {
  return (
    <>
      {children}
      <HorizontalLines />
      <Footer />
    </>
  );
}
