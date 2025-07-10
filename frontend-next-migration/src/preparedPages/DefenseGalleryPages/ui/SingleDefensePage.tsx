'use client';
import { HeroGroup, HeroManager } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';

export interface Props {
    heroGroup: HeroGroup;
}
const SingleDefensePage = (props: Props) => {
    const { heroGroup } = props;
    const { t } = useClientTranslation('heroes');
    //const heroManager = new HeroManager(t);
    //console.log(heroManager.getHeroesBySpecificGroup(heroGroup));
    return <div>{heroGroup}</div>;
};
export default SingleDefensePage;
