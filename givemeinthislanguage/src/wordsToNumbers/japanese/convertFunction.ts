import { japaneseKanjis } from "./numbersMap";

  export function convertJapaneseTimeToText(text: string): string {
    const timeParts = text.split('時');
    const hours = japaneseKanjis[timeParts[0].trim()];
    const minutes = timeParts[1] ? japaneseKanjis[timeParts[1].replace('分', '').trim()] : 0;
    console.log(hours, minutes);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
