export function getBehindYears(): number {
    const startYear = 2019;
    const currentYear = new Date().getFullYear();
    const finalYear = currentYear - startYear;
    return finalYear;
}
