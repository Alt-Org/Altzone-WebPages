'use client'; 
import React from "react"
import cls from "./SectionEmbedLink.module.scss"
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";

export const SectionEmbedLink = () => {
    const post1 = `${AppExternalLinks.igPost1}/embed/`
    const post2 = `${AppExternalLinks.igPost2}/embed/`
    const links = [post1, post2]

    return(
        <div className={cls.Wrapper}>
            {links.map((l, index) => (
                <div key={index} className={cls.Container}>
                    <iframe 
                        className={cls.Iframe}
                        title="Instagram post"
                        src={l}
                        style={{width: 300, height: 300}}
                    />
                </div>
            ))}
        </div>
    )
}