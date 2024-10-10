export type IGalleryDirectory = {
    name : string,
    type : "directory",
    mtime: Date
};

export type IGalleryPicture = {
    name : string
}

export type Version = "full" | "preview"