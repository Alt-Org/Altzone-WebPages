const galleryCatPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cats/*', { eager: true, as: 'url' }));
const galleryDogsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/dogs/*', { eager: true, as: 'url' }));
const galleryZooPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/zoo/*', { eager: true, as: 'url' }));
const galleryCartoonsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cartoons/*', { eager: true, as: 'url' }));



export const categories = [
    { key: "Cats", sources: galleryCatPaths, title: "Kissat" },
    { key: "Dogs", sources: galleryDogsPaths, title: "Koirat" },
    { key: "Zoo", sources: galleryZooPaths, title: "Zoo" },
    { key: "Cartoons", sources: galleryCartoonsPaths, title: "Sarjakuvat" },
    { key: "Dogs2", sources: galleryDogsPaths, title: "Koirat" },
];