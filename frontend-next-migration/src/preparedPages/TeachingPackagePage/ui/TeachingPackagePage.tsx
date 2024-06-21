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
import backgroundImage from "@/shared/assets/images/clanBg/Moon.webp";

interface Section {
  id: string;
  label: string;
}

type Props = {
  lng: string;
};

const TeachingPackagePage = async ({ lng }: Props) => {
  const sections: Section[] = [
    { id: 'section1', label: 'Esittely' },
    { id: 'section2', label: 'Toteutus' },
    { id: 'section3', label: 'Mitä Pelitaide on?' },
    { id: 'section4', label: 'Lesson Plan 1' },
    { id: 'section5', label: 'Lesson Plan 2' },
    { id: 'section6', label: 'Lesson Plan 3' },
    { id: 'section7', label: 'Lesson Plan 4' },
    { id: 'section8', label: 'Lesson Plan 5' },
    { id: 'section9', label: 'Assessment' },
    { id: 'section10', label: 'Additional Resources' },
    { id: 'section11', label: 'Teachers Notes' },
    { id: 'section12', label: 'Student Feedback' },
    { id: 'section13', label: 'Classroom Activities' },
    { id: 'section14', label: 'Homework Assignments' },
    { id: 'section15', label: 'Conclusion' },
  ];

  return (
    <div className={cls.pageContainer}>
      <FeedbackSideButton />
      <Navbar overlaid={true} />
      <div className={cls.mainContent}>
        <div className={cls.navbarSide}>
          <NavbarSide sections={sections} />
        </div>
        <div className={cls.content}>
          {sections.map((section) => (
            <div id={section.id} key={section.id} className={cls.section}>
              <h2>{section.label}</h2>
              <p>
                {section.id === 'section1' &&
                  'ALT Zone on taiteellisella sisällöllä varustettu mobiilipeli, jota kehitetään peruskoulujen taideopetuksen opetusvälineeksi. Pelitaiteen opetus on itsessään haastavaa, opetus perustuu vahvasti omakohtaiseen kokemukseen ja analysointiin, yhteistä kokemusta on lähes mahdotonta saavuttaa. ALT Zone tarjoaa yhteisen pohjan pelitaiteen opetukselle.'}
                {section.id === 'section2' &&
                  'Opetuspaketti on helppo toteuttaa; se sisältää mobiili- tai pc-laitteella testattavan demopelin, sekä pelitaiteen ajatteluun ohjaavia kysymyksiä. Peliä voidaan myös analysoida pelkästään videoiden ja kuvien avulla. Oppilailla on mahdollisuus jatkokehittää peliä sovelluskaupasta myöhemmin ladattavaksi ALT Zone 2.0 - mobiilipeliksi. ALT Zone 2.0 pelin tuotto menee nuorten unelmien tukemiseen siihen perustettavan säätiön kautta.'}
                {section.id === 'section3' &&
                  'Pelitaide on pelien taiteellista ilmaisua, joka ylittää viihteen rajat, kutsuen pelaajat syvemmälle kokemukseen tarjoten ainutlaatuisia esteettisiä elämyksiä ja herättäen tunteita. Se ilmenee monin eri tavoin, kuten visuaalisesti upeana grafiikkana, tunnelmallisena äänimaisemana ja monimutkaisena tarinankerrontana. Pelitaide kertoo tarinoita ja käsittelee monimutkaisia teemoja, syventäen pelaajien kokemusta ja herättäen syvempiä tunteita. Lisäksi se on interaktiivista, antaen pelaajille mahdollisuuden vaikuttaa tarinaan ja luoda henkilökohtaisia kokemuksia. Pelitaide voi myös toimia voimakkaana välineenä sosiaaliseen ja poliittiseen kommentointiin, herättäen keskustelua ja haastaen näkemyksiä. Kaiken kaikkiaan pelitaide on moniulotteinen taiteen muoto, joka tarjoaa ainutlaatuisen tilaisuuden ilmaista itseään ja kokea maailmaa uudella ja jännittävällä tavalla sekä taiteilijoille että pelaajille.'}
                {section.id === 'section4' &&
                  'Lesson Plan 1 content goes here.'}
                {section.id === 'section5' &&
                  'Lesson Plan 2 content goes here.'}
                {section.id === 'section6' &&
                  'Lesson Plan 3 content goes here.'}
                {section.id === 'section7' &&
                  'Lesson Plan 4 content goes here.'}
                {section.id === 'section8' &&
                  'Lesson Plan 5 content goes here.'}
                {section.id === 'section9' && 'Assessment content goes here.'}
                {section.id === 'section10' &&
                  'Additional resources content goes here.'}
                {section.id === 'section11' &&
                  "Teacher's notes content goes here."}
                {section.id === 'section12' &&
                  'Student feedback content goes here.'}
                {section.id === 'section13' &&
                  'Classroom activities content goes here.'}
                {section.id === 'section14' &&
                  'Homework assignments content goes here.'}
                {section.id === 'section15' && 'Conclusion content goes here.'}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// export default withBackgroundImage(
//     {}
// )(TeachingPackagePage);
// // export default TeachingPackagePage;


export default withBackgroundImage({
  alt: "Teaching Package bg image",
  imagePath: bgPicture as unknown as string,

// @ts-ignore
})(TeachingPackagePage);
