'use client';
import { NavbarGameArt } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { useServerTranslation } from '@/shared/i18n';
import cls from './GameArtPage.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import Image from 'next/image';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import NavbarSide from '@/widgets/NavbarSide/ui/NavbarSide';
import pageLogo from '@/shared/assets/images/teachingPackage/pageLogo.png';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods } from '@/shared/lib/classNames/classNames';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface Section {
  id: string;
  label: string;
}

type Props = {
  lng: string;
};

const GameArtPackagePage: React.FC<Props> = ({ lng }) => {
  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();
  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };
  const sections: Section[] = [
    { id: 'section1', label: 'Mitä on pelitaide?' },
    { id: 'section2', label: 'Pelitaiteen pieni infopaketti' },
    { id: 'section3', label: 'Taiteellinen ilmaisu' },
    { id: 'section4', label: 'Tarinan kerronta' },
    { id: 'section5', label: 'Luominen' },
    { id: 'section6', label: 'Kulttuuri & taide' },
    { id: 'section7', label: 'Kirjallisuutta' },
    { id: 'section8', label: 'Lähteet' },
    { id: 'section9', label: 'PRG - Psyche’s Royale Gaming ry' },
  ];

  return (
    <div className={classNames(cls.pageContainer, combinedModCss)}>
      <NavbarGameArt overlaid={true} />
      <div className={classNames(cls.mainContent, combinedModCss)}>
        {!isMobileSize && (
          <div className={cls.pageLogo}>
            <Image
              src={pageLogo}
              className={cls.backgroundImage}
              alt='pageLogo'
              height={600}
              width={600}
            />
          </div>
        )}
        {!isMobileSize && (
          <div className={classNames(cls.navbarSide, combinedModCss)}>
            <NavbarSide sections={sections} containerId='content' />
          </div>
        )}
        <div className={classNames(cls.content, combinedModCss)} id='content'>
          {sections.map((section) => (
            <div id={section.id} key={section.id} className={cls.section}>
              <h2>{section.label}</h2>
              <p>
                {section.id === 'section1' && <></>}
                {section.id === 'section2' && (
                  <>
                    “Parhaimmillaan pelitaide antaa kokijalleen suuren vapauden
                    tutkia ja kokeilla erilaisia historioita ja tulevaisuuksia,
                    joiden suuntaa eivät edes pelin tekijät ole täsmällisesti
                    määritelleet. Pelitaide tarjoaa aistillisia nautintoja.
                    Lisäksi se voi toimia keskustelun herättäjänä ja välineenä,
                    viisauden kasvattajana ja tunne-elämän vahvistajana.”
                    <br />
                    <br />
                    Jaakko kemppainen, Pelisuunnittelijan peruskirja (2019) ja
                    100 peli-ideaa (2022).
                    https://taidetutka.fi/2022/moniulotteinen-pelitaide/
                  </>
                )}
                {section.id === 'section3' && (
                  <>
                    Pelitaide edustaa pelien taiteellista ilmaisua, joka ylittää
                    perinteisen viihteen rajat. Se kutsuu pelaajat syvemmälle
                    kokemukseen, tarjoten ainutlaatuisia taiteellisia ja
                    esteettisiä elämyksiä. Pelitaide ei vain viihdytä, vaan se
                    haastaa, herättää tunteita ja tarjoaa tilaisuuden pohtia
                    monia eri teemoja. Pelitaide voi ilmetä monin eri tavoin; se
                    saattaa olla visuaalisesti upeaa grafiikkaa, tunnelmallista
                    äänimaisemaa tai monimutkaista tarinankerrontaa. Taidepelit
                    voivat myös hyödyntää pelimekaniikkaa ja vuorovaikutusta
                    pelaajan ja pelin välillä luodakseen ainutlaatuisia
                    kokemuksia. Yksi pelitaiteen tärkeimmistä piirteistä on sen
                    kyky kertoa tarinoita.
                  </>
                )}
                {section.id === 'section4' && (
                  <>
                    Yksi pelitaiteen keskeisistä piirteistä on sen kyky kertoa
                    tarinoita. Digitaaliset pelit tarjoavat valtavan
                    potentiaalin monimutkaisten ja koskettavien tarinoiden
                    luomiseen. Pelien avulla voidaan käsitellä monenlaisia
                    teemoja, kuten rakkaus, menetys, selviytyminen,
                    identiteetti, yhteiskunnalliset epäkohdat ja paljon muuta.
                    Pelit voivat tarjota pelaajille mahdollisuuden kokea ja
                    ymmärtää näitä aiheita syvällisesti, mikä tekee
                    pelitaiteesta voimakkaan välineen tarinankerrontaan ja
                    merkityksen luomiseen.
                  </>
                )}
                {section.id === 'section5' && (
                  <>
                    Pelitaide ilmenee monilla eri tavoilla pelien visuaalisesta
                    suunnittelusta ja äänimaisemasta aina tarinankerrontaan,
                    pelimekaniikkaan ja pelattavuuteen asti. Graafinen
                    suunnittelu, äänitehosteet, musiikki, dialogi, hahmojen
                    kehitys ja ympäristöjen luominen ovat vain muutamia
                    esimerkkejä pelitaiteen keskeisistä elementeistä, jotka
                    yhdessä muodostavat pelikokemuksen rikkauden ja syvyyden.
                  </>
                )}
                {section.id === 'section6' && (
                  <>
                    Pelitaide on lisäksi osa laajempaa kulttuurista ja
                    taiteellista maisemaa, joka vaikuttaa ja inspiroi monia
                    muita taiteen muotoja. Pelitaide voi toimia inspiraationa
                    elokuville, kirjallisuudelle, kuvataiteelle ja musiikille
                    sekä tarjota alustan kokeellisille ja rajat ylittäville
                    taiteen muodoille. Lisäksi se voi toimia voimakkaana
                    välineenä sosiaaliseen ja poliittiseen kommentointiin sekä
                    tarjota alustan yhteisöjen luomiselle ja yhteyksien
                    rakentamiselle pelaajien välillä.
                  </>
                )}
                {section.id === 'section7' && (
                  <>
                    Pelitaiteen kirjallisuutta Juho Kuorikoski, Pelitaiteen
                    manifesti 2018 ISBN: 9789524954839
                    <br />
                    Tuukka Hämäläinen ja Aleksandr Manzos, Pelien äärettömät
                    maailmat: Elämän suuret kysymykset digitaalisissa peleissä
                    2020 ISBN: 9789523456068
                    <br />
                    Jaakko Kemppainen, Pelisuunnittelijan peruskirja 2019 ISBN:
                    9789527347096
                    <br />
                    Jaakko Kemppainen, Pelit tekevät hyvää 2024 ISBN:
                    9789523812420
                  </>
                )}
                {section.id === 'section8' && (
                  <>
                    http://www.checkpointhelsinki.net/suomalainen-pelitaide/
                    <br />
                    https://igdafi.squarespace.com/
                    <br />
                    https:/taidetutka.fi/2022/moniulotteinen-pelitaide/
                    <br />
                    https://www.capitalgameart.fi/2021/11/28/mita-pelitaide-on/
                    <br />
                    https://www.youtube.com/watch?v=tVEmYtO8YR8
                    <br />
                  </>
                )}
                {section.id === 'section9' && (
                  <>
                    p. 0442407396 / Helena Pavloff-Pelkonen, psykkis@hotmail.com
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <FeedbackSideButton />
        <HorizontalLines />
        <Footer />
      </div>
    </div>
  );
};

export default withBackgroundImage({
  alt: 'Tiles bg image',
  imagePath: bgPicture as unknown as string,

  // @ts-ignore
})(GameArtPackagePage);
