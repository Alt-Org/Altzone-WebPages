const galleryCatPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cats/*', { eager: true, as: 'url' }));
const galleryDogsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/dogs/*', { eager: true, as: 'url' }));
const galleryZooPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/zoo/*', { eager: true, as: 'url' }));
const galleryCartoonsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cartoons/*', { eager: true, as: 'url' }));

export const categories = [
    { key: "Cats", sources: galleryCatPaths, title: "Kissat" , followLastImage: false},
    { key: "Dogs", sources: galleryDogsPaths, title: "Koirat" ,followLastImage: false},
    { key: "Zoo", sources: galleryZooPaths, title: "Zoo" ,followLastImage: false},
    { key: "Cartoons", sources: galleryCartoonsPaths, title: "Sarjakuvat" ,followLastImage: false},
    { key: "Dogs2", sources: galleryDogsPaths, title: "Koirat", followLastImage: false},
];