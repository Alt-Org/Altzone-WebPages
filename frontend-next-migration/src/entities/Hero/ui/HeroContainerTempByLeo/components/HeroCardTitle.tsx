import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import cls from './HeroCardTitle.module.scss';

type Props = Readonly<{
    combinedModCss: Mods,
		title: string
}>;
export function HeroCardTitle({ combinedModCss, title }: Props) {
	return(
			<div
				className={classNames(cls.heroName, combinedModCss)}
			>
				<h1>{title}</h1>
			</div>
	);
}