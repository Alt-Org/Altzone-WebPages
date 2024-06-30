import {HeroPage} from "@/preparedPages/HeroesPages";

type Props = {
    params: {
        id: string;
    };
};

export default async function({ params }: Props) {

    const { id } = params;
   
    return (
            <HeroPage
                selectedHero={id}
            />
    );
}
