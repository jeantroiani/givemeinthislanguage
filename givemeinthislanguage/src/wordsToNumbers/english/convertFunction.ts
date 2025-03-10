import { english } from "./numbersMap";

 export function convertEnglishTextToTime(text: string): string {
    const words = text.toLowerCase().split(' ');
    let hours = 0;
    let minutes = 0;

    for (let i = 0; i < words.length; i++) {
      if (english[words[i]] !== undefined) {
        if (i === 0) {
          hours = english[words[i]];
        } else {
          minutes += english[words[i]];
        }
      }
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  }