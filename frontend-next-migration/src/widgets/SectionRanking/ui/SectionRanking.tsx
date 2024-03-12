import cls from "./SectionRanking.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import pirate from "@/shared/assets/images/heros/pirate/pirate.webp";
import Players from "../model/players";

type Props = {

}

const SectionRanking = (props: Props) => {

    const {

    } = props;


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
                            <td> player </td>
                            <td> score </td>
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
                <Image src={pirate} alt={"Pirate hero photo"} className={cls.PirateImage}></Image>

            </div>


        </section>

    );
};

export default SectionRanking;