import '../preparedApp/styles/index.scss'
import {Providers} from "@/preparedApp/providers/Providers";

// @ts-ignore
export default function MyApp({ Component, pageProps }) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}