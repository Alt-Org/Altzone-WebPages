export type IGalleryDirectory = {
    name: string;
    type: 'directory';
    mtime: Date;
};

export type IGalleryPicture = {
    name: string;
};

export type ImageData = {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
};
