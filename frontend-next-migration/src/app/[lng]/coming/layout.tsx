import { ReactNode } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';

type Props = {
  children: ReactNode;
};

export default function AboutLayout({ children }: Props) {
  return (
    <>
      <Navbar overlaid />
      {children}
      <FeedbackSideButton />
      <Footer />
    </>
  );
}
