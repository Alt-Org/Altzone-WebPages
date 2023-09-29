import * as yup from "yup";


export const ValidationAddNewClan = yup.object().shape({


    name: yup
        .string()
        .required("Required")
        .min(3, "Clan name must be longer than or equal to 3 characters")
        .max(15, "Clan name must be shorter than or equal to 15 characters")
        .matches(/^[A-Za-z]+$/, "Clan name must contain only letters"),

    gameCoins: yup
        .number()
        .required("Required")
        .min(1, "Game coins must be greater than or equal to 1")
        .max(5000, "Game coins must be less than or equal to 1500"),


    tag: yup
        .string()
        .required("Tag is required")
        .min(3, "Tag must be longer than or equal to 3 characters")
        .max(10, "Tag must be shorter than or equal to 10 characters")
        .matches(/^[A-Za-z0-9_]+$/, "Tag can only contain letters, numbers, and underscores")

});


