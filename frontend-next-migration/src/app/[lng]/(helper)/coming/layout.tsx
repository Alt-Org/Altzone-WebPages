import { ReactNode } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

type Props = {
  children: ReactNode;
};

export default function ComingLayout({ children }: Props) {
  return (
    <>
      {children}
      <FeedbackSideButton />
      <HorizontalLines />
      <Footer />
    </>
  );
}
