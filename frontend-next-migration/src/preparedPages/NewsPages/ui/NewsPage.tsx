'use client';
import { Container } from '@/shared/ui/Container';
import { CustomForm } from '@/shared/ui/CustomForm';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodariNewsPage.png';
import NewsCard from './NewsCard/NewsCard';
import cls from './NewsPage.module.scss';
import search from '@/shared/assets/icons/search.png';


const NewsPage = () => {

    const newsPageMock = [
    {
        id: 1,
        title: 'Hannu Hodari News',
        content: 'Check out the latest news about Hannu Hodari and his amazing adventures!',
        date: '2024-03-01',
        imageUrl: hannu.src,
    },
    {
        id: 2,
        title: 'Latest News Title 2', 
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },

    {
        id: 3,
        title: 'Latest News Title 3',
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },
    {
        id: 4,
        title: 'Latest News Title 4',
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },
];

    return (
        <main className={cls.NewsPage}>

            <Container>
                <div className={cls.header}>
                    <h1>News</h1>
                    <div className={cls.searchContainer}>
                        <CustomForm.InputField
                            label=""
                            inputProps={{
                                placeholder: 'Hea',
                                className: cls.searchInput,
                                style: { 
                                    backgroundImage: `url(${search.src})`, 
                                    backgroundPosition: 'left 10px center', 
                                    backgroundRepeat: 'no-repeat', 
                                    paddingLeft: '40px',
                                    backgroundSize: '20px',
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={cls.newsGrid}>
                    {newsPageMock.map((news) => (
                        <NewsCard
                            key={news.id}
                            {...news}
                        />
                    ))}
                </div>

            </Container>
        </main>
    );
};

export default NewsPage;



// 'use client';
// import { Container } from '@/shared/ui/Container';
// import { CustomForm } from '@/shared/ui/CustomForm';
// import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
// import NewsCard from './NewsCard/NewsCard';
// import cls from './NewsPage.module.scss';
// import search1 from '@/shared/assets/icons/search1.png';
// import Image from 'next/image';
// import useSizes from '@/shared/lib/hooks/useSizes';

// const NewsPage = () => {

// const newsPageMock = [
//     {
//         id: 1,
//         title: 'Hannu Hodari News',
//         content: 'Check out the latest news about Hannu Hodari and his amazing adventures!',
//         date: '2024-03-01',
//         imageUrl: hannu.src,
//     },
//     {
//         id: 2,
//         title: 'Latest News Title 2', 
//         content:
//             'Another interesting news article with important information about recent developments.',
//         date: '2024-02-28',
//         imageUrl: hannu.src,
//     },

//     {
//         id: 3,
//         title: 'Latest News Title 3',
//         content:
//             'Another interesting news article with important information about recent developments.',
//         date: '2024-02-28',
//         imageUrl: hannu.src,
//     },
//     {
//         id: 4,
//         title: 'Latest News Title 4',
//         content:
//             'Another interesting news article with important information about recent developments.',
//         date: '2024-02-28',
//         imageUrl: hannu.src,
//     },
// ];

//         const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

//     return (
//         <div className={cls.News}>
//             {/* <Container> */}
//                 {/* <div className={cls.header}>
//                     <h1>News</h1>
//                     <div className={cls.searchContainer}>
//                         <CustomForm.InputField
//                             label=""
//                             inputProps={{
//                                 placeholder: 'Hea',
//                                 className: cls.searchInput,
//                                 style: { 
//                                     backgroundImage: `url(${search1.src})`, 
//                                     backgroundPosition: 'left 10px center', 
//                                     backgroundRepeat: 'no-repeat', 
//                                     paddingLeft: '40px',
//                                     backgroundSize: '20px',
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div> */}
//                     <main className={cls.NewsPage}>
                        
//                 <Container className={cls.TitleAndTabs}>
//                         <div className={cls.ContentAlignBoxRightBox}>
//                             <div>
//                                 {/* Title */}
//                                 <h1>News</h1>
//                             </div>
//                     <div className={cls.ContentAlignBox}>
//                         {!isMobileSize && !isTabletSize && (
//                             <div className={cls.ContentAlignBoxLeftBox} />
//                         )}
                    
//                             <div className={cls.Tabs}>
//                                 {!isMobileSize && !isTabletSize ? (
//                                     <div>
//                                         {/* Searchbox (desktop, widescreen) */}
//                                         <div className={cls.borderBox}>
//                                             <p>Search box</p>
//                                             <div className={cls.searchContainer}>

//                                             <CustomForm.InputField
//                                          label=""
//                                      inputProps={{
//                                        placeholder: 'Hea',
//                                      className: cls.searchInput,
//                                      style: { 
//                                      backgroundImage: `url(${search1.src})`, 
//                                     backgroundPosition: 'left 10px center', 
//                                     backgroundRepeat: 'no-repeat', 
//                                     paddingLeft: '40px',
//                                     backgroundSize: '20px',
//                                 }
//                             }}
//                         />
//                                         </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         {/* Categories (mobile, tablet) */}
//                                         <div className={cls.borderBox}>
//                                             <p>categories mobile</p>
//                                         </div>
//                                         {/* Searchbox (mobile, tablet) */}
//                                         <div className={cls.borderBox}>
//                                             <p>Search box</p>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </Container>

//                 <div className={cls.newsGrid}>
//                     {newsPageMock.map((news) => (
//                         <NewsCard
//                             key={news.id}
//                             {...news}
//                         />
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default NewsPage;
