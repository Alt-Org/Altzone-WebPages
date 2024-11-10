import { SectionHeroesBlocks } from '@/widgets/SectionHeroesBlocks';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import cls from './HeroesPage.module.scss';

export interface Props {
    SectionHeroesBlocksTitle: string;
}

const HeroesPage = (props: Props) => {
    const { SectionHeroesBlocksTitle = 'Heroes' } = props;

    return (
        <main className={cls.main}>
            <FeedbackSideButton disableMobile={true} />
            <SectionHeroesBlocks title={SectionHeroesBlocksTitle} />
        </main>
    );
};

export default HeroesPage;
