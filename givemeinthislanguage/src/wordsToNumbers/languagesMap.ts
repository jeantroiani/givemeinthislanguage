import { convertEnglishTextToTime } from "./english/convertFunction";
import { english } from "./english/numbersMap";
import { convertJapaneseTimeToText } from "./japanese/convertFunction";
import { japanese } from "./japanese/numbersMap";

enum languages {
    english = 'english',
    japanese = 'japanese',
}

export type LanguageSet = { [key: string]: number }

const languagesMap: { [key in languages]: LanguageSet } = {
    [languages.english]: english,
    [languages.japanese]: japanese,
};

type ConversionFunction = (text: string) => string;

export const languagesCoversionFunctionMap: { [key in languages]: ConversionFunction } = {
    [languages.english]: convertEnglishTextToTime,
    [languages.japanese]: convertJapaneseTimeToText,
};

export { languagesMap };

export default languages;