import Link from "next/link";
import Image from 'next/image';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ArrowButton.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';
import leftArrow from '@/shared/assets/images/heros/hero-container/leftArrow.svg';
import rightArrow from '@/shared/assets/images/heros/hero-container/rightArrow.svg';
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Direction = 'left' | 'right';
type ArrowType = 'outer' | 'inner';
type Props = Readonly<{
    direction: Direction,
		type: ArrowType,
		href: string
}>;
export default function ArrowButton({ direction, type, href }: Props) {
	const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

	const combinedModCss: Mods = {
		[cls.isMobile]: isMobileSize,
		[cls.isTablet]: isTabletSize,
		[cls.isDesktop]: isDesktopSize,
		[cls.isWidescreen]: isWidescreenSize,
	};
	const className = determineArrowClass(direction, type, combinedModCss);
	
	if(direction === 'left')
		return <LeftArrow className={className} href={href} />

	return <RightArrow className={className} href={href} />
}

type ArrowProps = Readonly<{
	className: string,
	href: string
}>;

function LeftArrow({ className, href } : ArrowProps) {
	return <Arrow href={href} src={leftArrow} className={className} alt="left arrow" />;
}

function RightArrow({ className, href } : ArrowProps) {
	return <Arrow href={href} src={rightArrow} className={className} alt="right arrow" />
}

type BaseArrowProps = Readonly<{
	href: string,
	className: string,
	alt: string,
	src: string | StaticImport
}>;
function Arrow({ href, className, alt, src }: BaseArrowProps){
	return (
		<Link className={className} href={href}>
			<Image src={src} alt={alt} />
		</Link>
	);
}

function determineArrowClass(direction: Direction, type: ArrowType, combinedModCss: Mods){
	if(direction === 'left' && type === 'outer')
		return classNames(cls.outerLeftArrow, combinedModCss, [ cls.outerArrow ]);

	if(direction === 'left' && type === 'inner')
		return classNames(cls.innerLeftArrow, combinedModCss, [ cls.innerArrow ]);

	if(direction === 'right' && type === 'outer')
		return classNames(cls.outerRightArrow, combinedModCss, [ cls.outerArrow ]);

	return classNames(cls.innerRightArrow, combinedModCss, [ cls.innerArrow ]);
}