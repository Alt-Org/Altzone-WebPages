import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './InfoWithLink.module.scss';

interface InfoWithLinkProps {
    text: string;
    linkText: string;
    linkPath: string;
}

const InfoWithLink = ({ text, linkText, linkPath }: InfoWithLinkProps) => {
    return (
        <div className={cls.container}>
            <p className={cls.text}>{text}</p>
            <AppLink
                to={linkPath}
                className={cls.link}
            >
                {linkText}
            </AppLink>
        </div>
    );
};

export default InfoWithLink;
