'use client';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import {
    DescriptionCardMobile,
    DescriptionCardMobileLink,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';

type Props = {
    isMobile: boolean;
    desktopImage: any;
    mobileImage: any;
    retroflector: any;
};

export default function DescriptionCardsSection({
    isMobile,
    desktopImage,
    mobileImage,
    retroflector,
}: Props) {
    if (isMobile) {
        return (
            <>
                <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                    <DescriptionCardMobile.Texts title="Defenssigalleria">
                        Lorem ipsum dolor sit amet consectetur. Id tincidunt scelerisque augue leo
                        nam diam tortor eget pharetra.
                    </DescriptionCardMobile.Texts>
                    <DescriptionCardMobile.Image
                        src={mobileImage}
                        alt="defence gallery"
                    />
                </DescriptionCardMobile>

                <DescriptionCardMobileLink
                    path="/hero-development"
                    ariaLabel="link to hero development page"
                    withScalableLink
                >
                    <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                        <DescriptionCardMobile.Texts title="Torjujat">
                            Torjujat ovat ujoudeltaan tehokkaita suojautumaan kilpensä taakse.
                            Heidän kilpensä ei kuitenkaan ole loputon, vaan sekin antaa lopulta
                            periksi paineen kasvaessa.
                        </DescriptionCardMobile.Texts>
                        <DescriptionCardMobile.Image
                            src={retroflector}
                            alt="retroflector"
                            backgroundColor="#FF0000"
                        />
                    </DescriptionCardMobile>
                </DescriptionCardMobileLink>
            </>
        );
    }

    return (
        <>
            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts width="35%">
                    <DescriptionCard.Texts.Title>Defenssigalleria</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        Lorem ipsum dolor sit amet consectetur. Id tincidunt scelerisque augue leo
                        nam diam tortor eget pharetra.
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width="65%">
                    <DescriptionCard.Image.Image
                        src={desktopImage}
                        alt="defence gallery"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>

            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Torjujat</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        Torjujat ovat ujoudeltaan tehokkaita suojautumaan kilpensä taakse. Heidän
                        kilpensä ei kuitenkaan ole loputon, vaan sekin antaa lopulta periksi paineen
                        kasvaessa.
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image bgColour="#FF0000">
                    <DescriptionCard.Image.Triangle />
                    <DescriptionCard.Image.Image
                        src={retroflector}
                        alt="defence gallery"
                        height={100}
                        marginLeft="20%"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
        </>
    );
}
