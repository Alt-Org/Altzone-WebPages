import * as yup from "yup";

export const ValidationAddNewClan = yup.object().shape({

    name: yup
        .string()
        .required("Vaadittu")
        .min(3, "Klaanin nimen on oltava vähintään 3 merkkiä pitkä")
        .max(15, "Klaanin nimen on oltava enintään 15 merkkiä pitkä")
        .matches(/^[A-Za-z]+$/, "Klaanin nimi saa sisältää vain kirjaimia"),

    tag: yup
        .string()
        .required("Tagi on vaadittu")
        .min(3, "Tagin on oltava vähintään 3 merkkiä pitkä")
        .max(10, "Tagin on oltava enintään 10 merkkiä pitkä")
        .matches(/^[A-Za-z0-9_]+$/, "Tagi voi sisältää vain kirjaimia, numeroita ja alaviivoja"),

    isOpen: yup
        .boolean()
});
