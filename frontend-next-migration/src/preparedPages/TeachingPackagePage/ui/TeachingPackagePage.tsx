'use client';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { Paragraph } from '@/shared/ui/Paragraph';
import { useServerTranslation } from '@/shared/i18n';
import cls from './TeachingPackagePage.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import downloadPicture from '@/shared/assets/images/teachingPackage/download.png';
import Image from 'next/image';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import NavbarSide from '@/widgets/NavbarSide/ui/NavbarSide';
import backgroundImage from '@/shared/assets/images/clanBg/Moon.webp';
import pageLogo from '@/shared/assets/images/teachingPackage/pageLogo.png';

interface Section {
  id: string;
  label: string;
}

type Props = {
  lng: string;
};

const TeachingPackagePage: React.FC<Props> = ({ lng }) => {
  const sections: Section[] = [
    { id: 'section1', label: 'Esittely' },
    { id: 'section2', label: 'Toteutus' },
    { id: 'section3', label: 'Mitä Pelitaide on?' },
    { id: 'section4', label: 'Visuaalinen vaikuttuvuus' },
    { id: 'section5', label: 'Toiminnallinen vaikuttavuus' },
    { id: 'section6', label: 'Yhteydet pelin ulkopuolelle' },
    { id: 'section7', label: 'ALT Zone -verkkopeli' },
    { id: 'section8', label: 'Erilaisten pelaajien yhteinen liittouma' },
    { id: 'section9', label: 'Pelihahmot & niiden kehittäminen' },
    { id: 'section10', label: 'Pelimekaniikka' },
    { id: 'section11', label: 'Nuorisotyö & pelitaiteen opetus kouluissa' },
    { id: 'section12', label: 'Pelitaiteen kirjallisuutta' },
    { id: 'section13', label: 'PRG - Psyche’s Royale Gaming ry' },
  ];

  return (
    <div className={cls.pageContainer}>
      <Navbar overlaid={true} />
      <div className={cls.mainContent}>
        <div className={cls.pageLogo}>
          <Image
            src={pageLogo}
            className={cls.backgroundImage}
            alt='pageLogo'
            height={600}
            width={600}
          />
        </div>
        <div className={cls.navbarSide}>
          <NavbarSide sections={sections} containerId='content' />
        </div>
        <div className={cls.content} id='content'>
          {sections.map((section) => (
            <div id={section.id} key={section.id} className={cls.section}>
              <h2>{section.label}</h2>
              <p>
                {section.id === 'section1' && (
                  <p>
                    ALT Zone on taiteellisella sisällöllä varustettu
                    mobiilipeli, jota kehitetään peruskoulujen taideopetuksen
                    opetusvälineeksi. Pelitaiteen opetus on itsessään haastavaa,
                    opetus perustuu vahvasti omakohtaiseen kokemukseen ja
                    analysointiin, yhteistä kokemusta on lähes mahdotonta
                    saavuttaa. ALT Zone tarjoaa yhteisen pohjan pelitaiteen
                    opetukselle.
                  </p>
                )}
                {section.id === 'section2' && (
                  <>
                    Opetuspaketti on helppo toteuttaa; se sisältää mobiili- tai
                    pc-laitteella testattavan demopelin, sekä pelitaiteen
                    ajatteluun ohjaavia kysymyksiä. Peliä voidaan myös
                    analysoida pelkästään videoiden ja kuvien avulla. Oppilailla
                    on mahdollisuus jatkokehittää peliä sovelluskaupasta
                    myöhemmin ladattavaksi ALT Zone 2.0 - mobiilipeliksi. ALT
                    Zone 2.0 pelin tuotto menee nuorten unelmien tukemiseen
                    siihen perustettavan säätiön kautta.
                  </>
                )}
                {section.id === 'section3' && (
                  <>
                    Pelitaide on pelien taiteellista ilmaisua, joka ylittää
                    viihteen rajat, kutsuen pelaajat syvemmälle kokemukseen
                    tarjoten ainutlaatuisia esteettisiä elämyksiä ja herättäen
                    tunteita. Se ilmenee monin eri tavoin, kuten visuaalisesti
                    upeana grafiikkana, tunnelmallisena äänimaisemana ja
                    monimutkaisena tarinankerrontana. Pelitaide kertoo tarinoita
                    ja käsittelee monimutkaisia teemoja, syventäen pelaajien
                    kokemusta ja herättäen syvempiä tunteita. Lisäksi se on
                    interaktiivista, antaen pelaajille mahdollisuuden vaikuttaa
                    tarinaan ja luoda henkilökohtaisia kokemuksia. Pelitaide voi
                    myös toimia voimakkaana välineenä sosiaaliseen ja
                    poliittiseen kommentointiin, herättäen keskustelua ja
                    haastaen näkemyksiä. Kaiken kaikkiaan pelitaide on
                    moniulotteinen taiteen muoto, joka tarjoaa ainutlaatuisen
                    tilaisuuden ilmaista itseään ja kokea maailmaa uudella ja
                    jännittävällä tavalla sekä taiteilijoille että pelaajille.
                  </>
                )}
                {section.id === 'section4' && (
                  <>
                    ● Pelihahmoista välittyvä teema/sanoma.
                    <br />
                    ● Hahmoluokkien edustamat roolit; representaation
                    tunnistettavuus.
                    <br />
                    ● Hahmojen graafinen tyyli; minkälaista ilmapiiriä ja
                    tunnelmaa viestii.
                    <br />
                    ● Graafinen symboliikka käyttöliittymässä; viestin
                    tunnistettavuus.
                    <br />
                    ● Mitä käyttöliittymän symboliikka kertoo meidän
                    aikakaudestamme nyt 2024?
                    <br />
                    ● Käyttöliittymän graafinen tyylilaji; mitä viestii pelin
                    luonteesta ja tunnelmasta.
                    <br />● Millaista symboliikkaa löydät sielunkodin
                    huonekaluista; mitä luulet taiteilijan halunneen sanoa
                    näillä esineillä?
                  </>
                )}
                {section.id === 'section5' && (
                  <>
                    ● Eri hahmoluokkien vaikutus pelattavuuteen ja strategiaan.
                    <br />
                    ● Eri hahmoluokkien keskinäiset suhteet; miten täydentävät
                    toisiaan.
                    <br /> ● Miten eri käyttöliittymäelementit kutsuvat
                    käyttäjän toimintaan ja osallistumiseen.
                    <br /> ● Kuvakkeiden toiminnallisen luonteen ja graafisen
                    symboliikan yhteys; onko perusteltua? (voisiko kehittää
                    edelleen?)
                    <br /> ● Jos battle olisi representaatio elämästä, niin
                    mistä se kertoisi?
                    <br /> ● Battlen ja ryöstön audiovisuaalinen kerronta; mitä
                    sanomaa välittää ja minkälaista tunnelmaa rakentaa?
                    <br /> ● Millä tavoin peli kuvastaa tekojen seurauksia ja
                    vastuullisuutta yhteisön jäsenenä toimimisesta?
                    <br /> ● Identiteetin rakentaminen profiilitietojen ja
                    avatarin muokkaamisen kautta. Entä kun ei voikaan tulla
                    näkyväksi (chat)?
                    <br /> ● Miten pelaajan tekemät valinnat vaikuttavat hänen
                    pelihahmonsa kehitykseen ja maineeseen klaanissa?
                    <br /> ● Minkälaisia tapoja pelaajalla on saada ääntään
                    kuuluviin? Miten pelaajan oma aatemaailma voi tulla
                    näkyväksi?
                    <br /> ● Mikä merkitys on esteettömyyden huomioimisella
                    arvojen näkökulmasta?
                  </>
                )}
                {section.id === 'section6' && (
                  <>
                    ● Hahmoissa heijastuvat/haastetut kulttuuriset stereotypiat
                    ja sukupuolinormit.
                    <br /> ● Käyttöliittymän grafiikassa heijastuvat/haastetut
                    kulttuuriset normit ja yhteiskunnalliset käsitykset.
                    <br /> ● Psykologiset tai sosiaaliset syyt eri hahmoluokkien
                    suosion taustalla.
                    <br /> ● Pelin ytimen ympärille rakentuvat sosiaaliset
                    käytännöt (yhteispelaamisen muodot, julkiset keskustelut
                    jne.)
                    <br /> ● Miten pelissä toteutettu äänestysmekaniikka
                    kuvastaa reaalimaailman demokraattisia prosesseja
                    <br /> ● Minkälaisia sosiaalisia taitoja peli kehittää osana
                    klaanitoimintaa ja yhteisöllistä päätöksentekoa?
                    <br /> ● Kuinka pelin mekaniikat voivat toimia työkaluina
                    opettaa yhteistyötä, neuvottelua ja yhteisöllisyyden arvoja?
                  </>
                )}
                {section.id === 'section7' && (
                  <>
                    ALT Zone on mobiililaitteille suunniteltu
                    yhteistoiminnallinen peli, jossa jokaisella liittouman
                    jäsenellä on oma tärkeä tehtävänsä. ALT Zone yhdistää
                    erilaiset pelaajat ihmisyytemme äärelle ja tärkeiksi
                    toisillemme, niiden vahvuuksien kanssa, joita kullakin
                    pelaajalla on.
                  </>
                )}
                {section.id === 'section8' && (
                  <>
                    Pelaajat muodostavat 30 jäsenen tiimin, jossa jokaiselle
                    pelaajatyypille on oma tärkeä paikkansa; keräilijät,
                    rakentajat, kilpailijat, suunnittelijat, jne. Tiimi asuu
                    planeetalla, jota sisustetaan pelin voitoilla, sekä
                    pelikaupasta ostettavilla huonekaluilla ja muilla
                    modauksilla. Kaikki on yhteistä. Chatti tukee "kylä
                    kasvattaa" periaatetta, kun pelaajat edustavat liittoumaansa
                    ja maataan (riippuen siitä missä keskustelevat).
                  </>
                )}
                {section.id === 'section9' && (
                  <>
                    Pelihahmojen suojakilpinä toimivat elävästä elämästä tutut
                    suojautumismekanismit. Kukin pelihahmo kuuluu yhteen
                    seitsemästä defenssiluokasta: “tunnottomat”, “luistajat”,
                    “sääntöorjat”, “heijastajat”, “itsensäruoskijat”,
                    “yliajattelijat”, “symbioottiset” (työnimiä). Hahmoluokkien
                    pohjainspiraationa on käytetty Gestalt -teoriaa. Hahmoluokka
                    määrää puolet pelihahmon ominaisuuksista ja loput 50%
                    pelaaja pystyy säätämään (buf aus/nerf aus) itse,
                    pelikentältä keräämillään timanteilla.
                  </>
                )}
                {section.id === 'section10' && (
                  <>
                    Ping Pong Pelimoodi - Pelihahmojen suojakilpinä toimivat
                    elävästä elämästä tutut suojautumismekanismit. Kukin
                    pelihahmo kuuluu yhteen seitsemästä defenssiluokasta:
                    “tunnottomat”, “luistajat”, “sääntöorjat”, “heijastajat”,
                    “itsensäruoskijat”, “yliajattelijat”, “symbioottiset”
                    (työnimiä). Hahmoluokkien pohjainspiraationa on käytetty
                    Gestalt -teoriaa. Hahmoluokka määrää puolet pelihahmon
                    ominaisuuksista ja loput 50% pelaaja pystyy käyttää itse,
                    pelikentää keräämillää timanteilla. RYÖSTÖ - 2v2 pelin
                    voittajatiimi suorittaa aikarajoitetun ryöstön vastustajan
                    varastoon. Voittona saatu rysteen saalis siirtyy ≠viäjän
                    planeetalta voittajille.
                  </>
                )}
                {section.id === 'section11' && (
                  <>
                    Nuorisotyö & pelitaiteen opetus kouluissa Kehitämme peliä
                    jatkuvasti PRG nuorten kanssa. Testaajaksi ja kehittäjiksi
                    pääsee liittymällä{' '}
                    <a
                      href='https://discord.gg/YGzep8aK'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: 'blue', textDecoration: 'underline' }}>
                      Discord serverille.
                    </a>{' '}
                    Demon tullessa valmiiksi (arviolta keväällä 2024) lähdemme
                    kiertämään sen kanssa maamme peruskouluja ja lukioita.
                    Demotestaus toteutetaan pelitaiteen opetuspaketissa, jossa
                    kouluille tarjotaan samalla välineet pelien tutkimiseen ja
                    analysoimiseen. Pyrkimyksemme on saada pelitaiteen käsittely
                    koulujen opetussuunnitelmaan samoin kuin siellä käsitellään
                    jo teatteria, elokuvaa, kirjallisuutta, kuvataidetta ja
                    musiikkia. Tutustu peliin ja yhteisten testailujen
                    aikatauluun skannaamalla QR-koodi ja hyppäämällä
                    Discord-peliyhteisöömme!
                  </>
                )}
                {section.id === 'section12' && (
                  <>
                    Juho Kuorikoski, Pelitaiteen manifesti 2018 ISBN:
                    9789524954839
                    <br /> Tuukka Hämäläinen ja Aleksandr Manzos, Pelien
                    äärettömät maailmat: Elämän suuret kysymykset digitaalisissa
                    peleissä 2020 ISBN: 9789523456068 Jaakko Kemppainen,
                    <br />
                    Pelisuunnittelijan peruskirja 2019 ISBN: 9789527347096
                    <br />
                    Jaakko Kemppainen, Pelit tekevät hyvää 2024 ISBN:
                    9789523812420
                  </>
                )}
                {section.id === 'section13' && (
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
  alt: 'Teaching Package bg image',
  imagePath: bgPicture as unknown as string,

  // @ts-ignore
})(TeachingPackagePage);
