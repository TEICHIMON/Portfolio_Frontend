export type Locale = keyof typeof dictionaries;

export type PageType =
  (typeof dictionaries)["en"];
export type Page = keyof PageType;

const locales = ["en", "ja"];

const dictionaries = {
  en: () =>
    import("./dictionaries/en.json").then(
      (module) => module.default,
    ),
  ja: () =>
    import("./dictionaries/ja.json").then(
      (module) => module.default,
    ),
};

export const getDictionary = async (
  locale: Locale,
) => {
  locale = locales.includes(locale)
    ? locale
    : "en";
  const localeModule =
    await dictionaries[locale]();
  return localeModule;
};
