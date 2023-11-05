import * as yup from "yup";

export const ValidationLoginSchema = yup.object().shape({
    // email: yup.string().required('Vaadittu').email('Virheellinen sähköpostiosoite'),
    username: yup
        .string()
        .required("Vaadittu")
        .min(3, "Käyttäjänimen on oltava vähintään 3 merkkiä pitkä")
        .max(15, "Käyttäjänimen on oltava enintään 15 merkkiä pitkä")
        .matches(/^[a-zA-Z0-9]*$/, "Käyttäjänimi saa sisältää vain kirjaimia ja numeroita"),
    password: yup
        .string()
        .min(6, "Salasanan on oltava vähintään 6 merkkiä pitkä")
        .max(30, "Salasanan on oltava enintään 30 merkkiä pitkä")
        .required("Syötä salasanasi"),
});

export const ValidationRegisterSchema = yup.object().shape({
    username: yup
        .string()
        .required("Vaadittu")
        .min(3, "Käyttäjänimen on oltava vähintään 3 merkkiä pitkä")
        .max(15, "Käyttäjänimen on oltava enintään 15 merkkiä pitkä")
        .matches(/^[a-zA-Z0-9]*$/, "Käyttäjänimi saa sisältää vain kirjaimia ja numeroita"),
    password: yup
        .string()
        .min(6, "Salasanan on oltava vähintään 6 merkkiä pitkä")
        .max(30, "Salasanan on oltava enintään 30 merkkiä pitkä")
        .required("Syötä salasanasi"),
    repeatPassword: yup.string()
        // @ts-ignore
        .oneOf([yup.ref('password'), null], "Salasanojen on täsmättävä")
        .required("Vahvista salasanasi"),

    name: yup
        .string()
        .min(3, "Nimen on oltava vähintään 3 merkkiä pitkä")
        .max(20, "Nimen on oltava enintään 20 merkkiä pitkä")
        .matches(/[^a-zA-Z\s]+/, "Nimi saa sisältää vain kirjaimia"),

    backpackCapacity: yup
        .number(),

    uniqueIdentifier: yup
        .string(),
})
