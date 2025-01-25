import { SectionHeroesBlocks } from '@/widgets/SectionHeroesBlocks';
import { Container } from '@/shared/ui/Container';
import cls from './HeroesPage.module.scss';

export interface Props {
    SectionHeroesBlocksTitle: string;
}

const HeroesPage = (props: Props) => {
    const { SectionHeroesBlocksTitle = 'Heroes' } = props;

    return (
        <Container
            as="main"
            fluid={true}
            className={cls.main}
        >
            <SectionHeroesBlocks title={SectionHeroesBlocksTitle} />
        </Container>
    );
};

export default HeroesPage;
