import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
};

export default function ComingLayout({ children }: Props) {
    return (
        <LayoutWithIntro
            introHeight={'70vh'}
            title={'Comics'}
            bgImage={
                'https://unknownworlds.com/_next/image?url=https%3A%2F%2Fd17c72h1ypygg7.cloudfront.net%2Fnews_hero_72ff4c6996.png&w=1440&q=75'
            }
            description={
                'lollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololollollolllololol'
            }
        >
            {children}
            {/*<FeedbackSideButton />*/}
            {/*<HorizontalLines />*/}
        </LayoutWithIntro>
    );
}
