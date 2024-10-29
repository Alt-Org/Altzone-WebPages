import { Meta, StoryObj } from "@storybook/react";
import { EmbedSocialMediaPosts } from "./EmbedSocialMediaPosts";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";

const meta: Meta<typeof EmbedSocialMediaPosts> = {
    title: 'shared/SocialMediaEmbeb',
    component: EmbedSocialMediaPosts,
}
export default meta

type Story = StoryObj<typeof EmbedSocialMediaPosts>;

export const Default: Story = {
    args: {
        posts: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ]
    }
}
