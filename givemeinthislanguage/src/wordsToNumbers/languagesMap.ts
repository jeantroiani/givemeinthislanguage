import { convertEnglishTextToTime } from "./english/convertFunction";
import { englishNumberWordsMap } from "./english/numbersMap";
import { convertJapaneseTimeToText } from "./japanese/convertFunction";
import { japanese } from "./japanese/numbersMap";

enum Languages {
    English = 'english',
    Japanese = 'japanese',
}

export type LanguageSet = { [key: string]: number };

const languagesMap: { [key in Languages]: LanguageSet } = {
    [Languages.English]: englishNumberWordsMap,
    [Languages.Japanese]: japanese,
};

export type ConversionFunction = (text: string) => string | undefined;

export const languagesConversionFunctionMap: { [key in Languages]: ConversionFunction } = {
    [Languages.English]: convertEnglishTextToTime,
    [Languages.Japanese]: convertJapaneseTimeToText,
};

export { languagesMap };

export default Languages;