export type Mods = Record<string, boolean | string | undefined>;

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([classname]) => classname),
        ...additional.filter(Boolean),
    ]
        .join(' ')
        .trim();
}
