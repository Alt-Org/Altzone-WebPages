import * as yup from 'yup';

//todo add i18n
export const ValidationAddNewClan = yup.object().shape({
    name: yup
        .string()
        .required('Vaadittu')
        .min(3, 'Klaanin nimen on oltava vähintään 3 merkkiä pitkä')
        .max(15, 'Klaanin nimen on oltava enintään 15 merkkiä pitkä')
        .matches(/^[A-Za-z]+$/, 'Klaanin nimi saa sisältää vain kirjaimia'),

    tag: yup
        .string()
        .required('Tagi on vaadittu')
        .min(3, 'Tagin on oltava vähintään 3 merkkiä pitkä')
        .max(10, 'Tagin on oltava enintään 10 merkkiä pitkä')
        .matches(/^[A-Za-z0-9_]+$/, 'Tagi voi sisältää vain kirjaimia, numeroita ja alaviivoja'),

    phrase: yup
        .string()
        .required()
        .min(3, 'Moton on oltava vähintään 3 merkkiä pitkä')
        .max(30, 'Moton on oltava enintään 30 merkkiä pitkä')
        .matches(/^[A-Za-z0-9_]+$/, 'Motto voi sisältää vain kirjaimia, numeroita ja alaviivoja'),

    labels: yup
        .array()
        .of(
            yup.object({
                label: yup.string(),
                value: yup.string(),
            }),
        )
        .required()
        .min(1, 'Valitse vähintään 1'),

    isOpen: yup.boolean(),
});
