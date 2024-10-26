export type Props = {
    title: string;
};

export default function About(props: Props) {
    const { title } = props;

    return <div>{title}</div>;
}
