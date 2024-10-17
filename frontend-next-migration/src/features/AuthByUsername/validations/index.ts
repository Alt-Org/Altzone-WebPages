import * as yup from "yup";

export const ValidationLoginSchema = yup.object().shape({
    // email: yup.string().required('Vaadittu').email('Virheellinen sähköpostiosoite'),
    username: yup
        .string()
        .required("username_required_error")
        .min(3, "username_min_error")
        .max(15, "username_max_error")
        .matches(/^[a-zA-Z0-9]*$/, "username_regex_error"),
    password: yup
        .string()
        .min(6, "password_min_error")
        .max(30, "password_max_error")
        .required("Syötä salasanasi"),
});

export const ValidationRegisterSchema = yup.object().shape({
    username: yup
        .string()
        .required("username_required_error")
        .min(3, "username_min_error")
        .max(15, "username_max_error")
        .matches(/^[a-zA-Z0-9]*$/, "username_regex_error"),
    password: yup
        .string()
        .min(6, "password_min_error")
        .max(30, "password_max_error")
        .required("password_required_error"),
    repeatPassword: yup.string()
        .oneOf([yup.ref('password')], "password_again_is_not_same_error")
        .required("password_again_required_error"),

    name: yup
        .string()
        .min(3, "name_min_error")
        .max(20, "name_max_error")
        .matches(/^[a-zA-Z\s]+$/, "name_regex_error"),
    backpackCapacity: yup
        .number(),

    uniqueIdentifier: yup
        .string(),

    ageConsent: yup
        .boolean()
        // todo add i18n
        .oneOf([true], "age_consent_required_error")
        .required("age_consent_required_error"),
})
