import {HeroesPage as HeroPage} from "@/preparedPages/HeroesPage";

type Props = {
    params: {
        id: string;
    };
};

export default async function HeroesPage({ params }: Props) {

    const { id } = params;

    return (
        <div>
            <h1>Hero Page</h1>
            <p>Hero id: {id}</p>

            <HeroPage
                selectedHero={Number(id)}
            />

        </div>
    );
}
