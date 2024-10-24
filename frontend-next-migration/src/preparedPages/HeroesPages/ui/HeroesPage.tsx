import { SectionHeroesBlocks } from '@/widgets/SectionHeroesBlocks';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import cls from './HeroesPage.module.scss';

interface Props {
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

export default withBackgroundImage<Props>({
    alt: 'ClassifiedHeroesPage underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(HeroesPage);
