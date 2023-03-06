import { classNames } from "./classNames";

describe("classNames", () => {
    it("should return a string of class names separated by a space", () => {
        expect(classNames("main-class")).toBe("main-class");
        expect(classNames("main-class", { active: true })).toBe(
            "main-class active"
        );
        expect(
            classNames("main-class", { active: true }, ["additional-class"])
        ).toBe("main-class active additional-class");
    });

    it("should return an empty string if no class names are provided", () => {
        const expected = "";
        expect(classNames("")).toBe(expected);
        // expect(classNames(null)).toBe(expected);
        // expect(classNames(undefined)).toBe(expected);
    });

    it("should support a class name being an empty string", () => {
        const expected = "active";
        expect(classNames("", { active: true })).toMatch(expected);
    });

    it("should support multiple mods", () => {
        const expected = "main-class active disabled";
        expect(classNames("main-class", { active: true, disabled: true })).toBe(
            expected
        );
    });

    it("should not include falsy mod values in the class names", () => {
        const expected = "main-class";
        expect(classNames("main-class", { active: false })).toBe(expected);
        // expect(classNames('main-class', { active: '' })).toBe(expected);
        // expect(classNames("main-class", { active: null })).toBe(expected);
        // expect(classNames("main-class", { active: undefined })).toBe(expected);
    });

    it("should support additional class names", () => {
        expect(classNames("main-class", {}, ["additional-class"])).toBe(
            "main-class additional-class"
        );
        expect(
            classNames("main-class", {}, ["additional-class", "second-class"])
        ).toBe("main-class additional-class second-class");
        expect(classNames("main-class", {}, [])).toBe("main-class");
    });
});
