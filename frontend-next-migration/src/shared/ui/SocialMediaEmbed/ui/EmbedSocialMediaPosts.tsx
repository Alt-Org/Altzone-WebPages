import cls from "./EmbedSocialMediaPosts.module.scss"

interface PostProps {
    posts: string[]
}

export const EmbedSocialMediaPosts = ({ posts }: PostProps) => {
    const addString = (link: string) => {
        if (link.startsWith("https://www.instagram.com")) {
            return `${link}/embed/`
        } else {
            return link
        }
    }

    const links = posts.map(addString)

    return(
        <div className={cls.Wrapper}>
            {links.map((l, index) => (
                <div key={index} className={cls.Container}>
                    <iframe 
                        className={cls.Iframe}
                        title="Embedded post"
                        src={l}
                        style={{width: 350, height: 400}}
                    />
                </div>
            ))}
        </div>
    )
}