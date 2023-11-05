import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// for async loading
// import Backend from "i18next-http-backend";
//
import { Language} from "./types";
import {LS_KEYS} from "@/shared/const/env/LS_KEYS";

const defaultLanguage = localStorage.getItem(LS_KEYS.LOCAL_STORAGE_LANGUAGE_KEY) || Language.ENGLISH;

// // for all options read: https://www.i18next.com/overview/configuration-options
// i18n
//     // .use(Backend)
//     // .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//
//         // lng: 'en',
//         // fallbackLng: 'en',
//         lng: defaultLanguage,
//         fallbackLng: defaultLanguage,
//         debug: true,
//         interpolation: {
//             escapeValue: false, // not needed for react as it escapes by default
//         },
//         // useSuspense: true,
//         backend: {
//             loadPath: "/locales/{{lng}}/{{ns}}.json",
//         },
//     })
//



import enJSON from '../locale/en.json'
import fiJSON from '../locale/fi.json'

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enJSON },
        fi: { ...fiJSON },
    },
    interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    debug: true,
    lng: "en",
});


export default i18n;

