'use client'
import Image from "next/image";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import pirate from "@/shared/assets/images/heros/pirate/pirate.webp";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import Players from "../model/players";
import cls from "./SectionRanking.module.scss";

type Props = {
    rankingPlayerText: string;
    rankingScoreText: string;
}

const SectionRanking = (props: Props) => {

    const {
        rankingPlayerText,
        rankingScoreText
    } = props;

    const { isMobileSize } = useIsMobileSize();

    return (
        <section className={cls.SectionRanking}>

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={cls.Content}>
                <div className={cls.Ranking}>
                    <table className={cls.Table}>
                        <tr className={cls.TableTitleRow}>
                            <td> # </td>
                            <td> {rankingPlayerText} </td>
                            <td> {rankingScoreText} </td>
                        </tr>
                        {Players.map((item) => (
                            <tr className={cls.TableContentRow} key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.player}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </table>

                </div>
                
                {!isMobileSize && (
                    <Image src={pirate} alt={"Pirate hero photo"} className={cls.PirateImage}/>
                )}

            </div>


        </section>

    );
};

export default SectionRanking;