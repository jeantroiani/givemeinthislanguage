import { convertEnglishTextToTime } from "./english/convertFunction";
import { englishNumberWordsMap } from "./english/numbersMap";
import { convertJapaneseTimeToText } from "./japanese/convertFunction";
import { japanese } from "./japanese/numbersMap";

enum languages {
    english = 'english',
    japanese = 'japanese',
}

export type LanguageSet = { [key: string]: number }

const languagesMap: { [key in languages]: LanguageSet } = {
    [languages.english]: englishNumberWordsMap,
    [languages.japanese]: japanese,
};

export type ConversionFunction = (text: string) => string | undefined;

export const languagesCoversionFunctionMap: { [key in languages ]: ConversionFunction } = {
    [languages.english]: convertEnglishTextToTime,
    [languages.japanese]: convertJapaneseTimeToText,
};

export { languagesMap };

export default languages;