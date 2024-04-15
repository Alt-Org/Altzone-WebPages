import {HeroesPage as HeroPage} from "@/preparedPages/HeroesPage";

type Props = {
    params: {
        id: string;
    };
};

export default async function HeroesPage({ params }: Props) {

    const { id } = params;
   
    return (
       
           

            <HeroPage
                selectedHero={id}
            />

        
    );
}
