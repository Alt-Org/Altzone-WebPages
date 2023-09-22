import * as yup from "yup";

export const ValidationLoginSchema = yup.object().shape({
    // email: yup.string().required('Required').email('Invalid email'),
    username: yup
        .string()
        .required("Required")
        .min(3, "Username must be longer than or equal to 3 characters")
        .max(15, "Username must be shorter than or equal to 15 characters")
        .matches(/^[a-zA-Z0-9]*$/, "Username must contain only letters and numbers"),
    password: yup
        .string()
        .min(6, "Password must be longer than or equal to 6 characters")
        .max(30, "Password must be shorter than or equal to 30 characters")
        .required("Enter your password"),
});


export const ValidationRegisterSchema = yup.object().shape({
    username: yup
        .string()
        .required("Required")
        .min(3, "Username must be longer than or equal to 3 characters")
        .max(15, "Username must be shorter than or equal to 15 characters")
        .matches(/^[a-zA-Z0-9]*$/, "Username must contain only letters and numbers"),
    password: yup
        .string()
        .min(6, "Password must be longer than or equal to 6 characters")
        .max(30, "Password must be shorter than or equal to 30 characters")
        .required("Enter your password"),
    repeatPassword: yup.string()
        // @ts-ignore
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Confirm your password"),

    name: yup
        .string()
        .min(3, "name must be longer than or equal to 3 characters")
        .max(20, "name must be shorter than or equal to 20 characters")
        .matches(/[^a-zA-Z\s]+/, "Username must contain only letters"),

    backpackCapacity: yup
        .number(),


    uniqueIdentifier: yup
        .string(),
})

