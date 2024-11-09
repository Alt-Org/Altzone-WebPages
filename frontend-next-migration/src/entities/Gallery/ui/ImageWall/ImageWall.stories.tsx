import { StoryObj } from "@storybook/react";
import { ImageWall } from "./ImageWall";

const meta = {
    title: 'entities/Gallery/ImageWall',
    component: ImageWall,
}
export default meta

type Story = StoryObj<typeof meta>;

const mockImages = {
    "image1": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image2": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 283
    },
    "image3": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image4": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 183
    },
    "imgae5": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image6": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 283
    },
    "image7": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image8": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 183
    },
    "image9": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image10": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 283
    },
    "image11": {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png",
        width: 275,
        height: 275
    },
    "image12": {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
        width: 275,
        height: 183
    }
}

export const Full: Story = {
    args: {
        version: "full",
        images: mockImages
    }
}

export const Preview: Story = {
    args: {
        version: "preview",
        images: mockImages,
        seeMoreLink: {
            href: "/picture-galleries",
            text: "See more"
        }
    }
}