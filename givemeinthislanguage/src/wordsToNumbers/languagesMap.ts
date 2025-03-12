import { convertEnglishTextToTime } from "./english/convertFunction";
import { englishNumberWordsMap } from "./english/numbersMap";
import { convertJapaneseTimeToText } from "./japanese/convertFunction";
import { japanese } from "./japanese/numbersMap";

export enum Languages {
    English = 'english',
    Japanese = 'japanese',
}

export type ConversionFunction = (text: string) => string | undefined;
export type LanguageSet = { [key: string]: number };
export type LanguageData = {
    [key: string]: {
        numberWordsMap: LanguageSet;
        conversionFunction: ConversionFunction;
        title: string;
        titleFontFamily?: string;
    };
}

const languagesMap: { [key in Languages]: LanguageSet } = {
    [Languages.English]: englishNumberWordsMap,
    [Languages.Japanese]: japanese,
};


const languagesData: LanguageData = {
    [Languages.English]: {
        numberWordsMap: englishNumberWordsMap,
        conversionFunction: convertEnglishTextToTime,
        title: 'What time is it?',
    },
    [Languages.Japanese]: {
        numberWordsMap: japanese,
        conversionFunction: convertJapaneseTimeToText,
        title: '今何時ですか？',
        titleFontFamily: 'Noto Sans JP',
    },
};

export { languagesData };

export { languagesMap };

export default Languages;