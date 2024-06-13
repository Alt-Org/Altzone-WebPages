import {INewsElement} from "@/entities/News";


export const newsDataLocally: INewsElement[] = [
    {
        id: '1',
        title: '1 Uutinen',
        date: new Date(2023, 0, 1),
        bodyPreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae doloremque impedit minima, non quam quibusdam quis quisquam repellat,',
        bodyElements:
            [
                { type: 'image', widthPx: 600, url: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*', alt: 'Image 1' },
                { type: 'text', content:
                        `
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae doloremque impedit minima, non quam quibusdam quis quisquam repellat, sed similique sint suscipit veniam, vitae. Consequuntur labore quasi soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aut eveniet harum inventore iusto nam rem soluta tempora. Animi distinctio natus rem! Excepturi facere inventore magni nihil perspiciatis veniam!</p>
                        https://www.google.com/
`},
                { type: 'image', heightPx: 500, url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60', alt: 'Image 2' },
                { type: 'text', content:
                        `
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae doloremque impedit minima, non quam quibusdam quis quisquam repellat, sed similique sint suscipit veniam, vitae. Consequuntur labore quasi soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aut eveniet harum inventore iusto nam rem soluta tempora. Animi distinctio natus rem! Excepturi facere inventore magni nihil perspiciatis veniam!</p>
                        https://www.google.com/
`}
        ]
    },

    {
        id: '2',
        title: '2 Uutinen',
        date:  new Date(2023, 1, 15),
        bodyPreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae doloremque impedit minima, non quam quibusdam quis quisquam repellat,',
        bodyElements:
            [
                { type: 'image', widthPx: 600, url: 'https://hips.hearstapps.com/hmg-prod/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=1.00xw:0.756xh;0,0.0756xh&resize=1200:*', alt: 'Image 1' },
                { type: 'text', content: 'Some text here' },
                { type: 'image', heightPx: 500, url: 'https://www.thesprucepets.com/thmb/y4YEErOurgco9QQO-zJ6Ld1yVkQ=/3000x0/filters:no_upscale():strip_icc()/english-dog-breeds-4788340-hero-14a64cf053ca40f78e5bd078b052d97f.jpg', alt: 'Image 2' },
                { type: 'text', content:
                        `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae doloremque impedit minima, non quam quibusdam quis quisquam repellat, sed similique sint suscipit veniam, vitae. Consequuntur labore quasi soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aut eveniet harum inventore iusto nam rem soluta tempora. Animi distinctio natus rem! Excepturi facere inventore magni nihil perspiciatis veniam!</p>
                        https://www.google.com/
`}
            ]
    },

]