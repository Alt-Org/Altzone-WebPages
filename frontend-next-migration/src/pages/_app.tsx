import '../app/styles/index.scss'
import {Providers} from "@/app/providers/Providers";

// @ts-ignore
export default function MyApp({ Component, pageProps }) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}