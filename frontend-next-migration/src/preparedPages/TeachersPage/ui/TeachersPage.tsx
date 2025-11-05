'use client';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './TeachersPage.module.scss';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import LessonList from './LessonList/LessonList';
import { Button } from '@/shared/ui/v2/Button';

const TeachersPage = () => {
    return (
        <div className={cls.container}>
            <PageTitle
                titleText="Opettajan sivu"
                alternate={true}
                searchVisible={false}
            />
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Tervetuloa!</DescriptionCard.Texts.Title>
                    <h2>
                        Täällä pääset hallinnoimaan oppituntejasi ja valmistautumaan pelitaiteen
                        opetukseen
                    </h2>
                    <p>
                        Opettajan paneelissa kohdassa Omat oppitunnit voit luoda uuden oppitunnin
                        antamalla sille sopivan tunnisteen (esim. 7B-luokka) sekä selata ja poistaa
                        luomiasi oppitunteja.
                    </p>
                    <p>
                        Siirtymällä oppituntiin avautuu näkymä, josta löytyy kyseistä oppituntia
                        varten tarvittavat lisätiedot klaaneihin liittymiseksi, opetukseen
                        tarvittavat diat, klaanien tulostaulukko sekä myös kotitehtävän osuus.
                        Opetustilanteessa heijasta vain haluamasi oppitunti sisältöineen ja
                        vaiheineen taululle.
                    </p>
                    <p>
                        Opetukseen valmistautumisen yhteyteen on tehty perusteelliset infopaketit
                        liittyen mm. pelitaiteeseen sekä tämän opetuspaketin sisältämiin
                        pelilukutaitoihin ja niiden tehtäviin.
                    </p>
                </DescriptionCard.Texts>
            </DescriptionCard>
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <LessonList />
            </DescriptionCard>
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>
                        Opetukseen valmistautuminen
                    </DescriptionCard.Texts.Title>
                    <h2>Oppituntien hallinnointi</h2>
                    <p>
                        Opettajalla voi olla samanaikaisesti aktiivisena enintään 10 oppituntia.
                        Opettaja voi poistaa vanhentuneita ja käytyjä oppitunteja, jolloin tilaa
                        vapautuu seuraaville oppitunneille. Suositeltavaa myös on, että suoritettu
                        oppitunti poistetaan mahdollisimman pian. Mikäli opettaja jättää poistamatta
                        aikaisemmin luodun oppitunnin, se katsotaan vanhentuneeksi X kuukauden
                        kuluttua oppitunnin luomisesta ja poistuu silloin järjestelmästä
                        automaattisesti.
                    </p>
                    <h2>Oppitunnin toteutus</h2>
                    <p>
                        Oppituntiin sisällytetään kaksi klaania, jotka kilpailevat keskenään
                        testauksen ajan. Tutustukaa ensin pelilukutaidon tehtäviin ja pelitaiteen
                        opetusmateriaaliin ja varatkaa tälle aikaa noin XX.
                    </p>
                    <p>
                        Testaus voidaan aloittaa, kun oppilaat ovat ladanneet pelin testiversion
                        tämän sivun alaosasta ja luoneet peliin tunnuksen.
                    </p>
                    <p>
                        Oppilaat pääsevät liittymään klaaneihin niille osoitetuilla salasanoilla
                        pelistä. Jakaututukaa näihin kahteen klaaniin mahdollisimman tasaisesti.
                    </p>
                    <p>
                        Testauksen aikana oppilaat suorittavat tehtäviä eri pelilukutaidon osioista.
                        Testauksen päättymisen jälkeen tulokset on nähtävillä tulostaulukosta.
                        Testausosuuteen on hyvä varata aikaa noin 20 minuuttia.
                    </p>
                    <h2>Valmistautumista tukevat materiaalit</h2>
                    <p>Mitä materiaaleja valmistautumiseen ja missä. Ne tähän yhteyteen.</p>
                    <h2>Pelilukutaidon tehtävät</h2>
                    <p>
                        Alta pääset pelilukutaidon tehtävien sivulle. Siellä voit tutustua
                        saatavilla oleviin tehtäviin.
                    </p>
                    <Button
                        path="/teachers/tasks"
                        className={cls.taskButton}
                    >
                        Pelilukutaidon tehtävät
                    </Button>
                </DescriptionCard.Texts>
            </DescriptionCard>
        </div>
    );
};

export default TeachersPage;
