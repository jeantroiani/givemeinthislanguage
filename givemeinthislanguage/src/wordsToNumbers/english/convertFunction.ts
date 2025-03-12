import { MIDNIGHT, NOON } from "../variables";
import { englishNumberWordsMap } from "./numbersMap";
import { stringStartsWithItIs } from "./utils/stringStartsWithItIs";

export function convertEnglishTextToTime(text: string): string | undefined {
  const words = text.toLowerCase().trim().split(' ');

  // Check if the text starts with "it's" or "it is"
  if (stringStartsWithItIs(words)) {
    words.shift();
  }

  let hours = 0;
  let minutes = 0;

  // If length is 1, check if it is midnight or noon
  if (words.length === 1) {
    if (words[0] === 'midnight') {
      return MIDNIGHT;
    } else if (words[0] === 'noon' || words[0] === 'midday') {
      return NOON;
    }
  }

  const isValidTimeNumber = (word: string) => englishNumberWordsMap[word] !== undefined;

  // If length is 1 and it contains a hyphen and after splitting both are valid time numbers, check if it is a time
  if (words.length === 1 && words[0].includes('-')) {
    const [hourTens, hourUnits] = words[0].split('-');
    if (isValidTimeNumber(hourTens) && isValidTimeNumber(hourUnits)) {
      hours = englishNumberWordsMap[hourTens] ?? 0;
      minutes = englishNumberWordsMap[hourUnits] ?? 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  }

  // If length is 2, check if it is o'clock
  if (words.length === 2) {
    if (words[1] === "o'clock" && isValidTimeNumber(words[0])) {
      hours = englishNumberWordsMap[words[0]] ?? 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    if (isValidTimeNumber(words[0]) && isValidTimeNumber(words[1])) {
      hours = englishNumberWordsMap[words[0]];
      minutes = englishNumberWordsMap[words[1]] ?? 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    if (words[1].includes('-')) {
      const [minuteTens, minuteUnits] = words[1].split('-');
      if (isValidTimeNumber(words[0]) && isValidTimeNumber(minuteTens) && isValidTimeNumber(minuteUnits)) {
        hours = englishNumberWordsMap[words[0]] ?? 0;
        minutes = (englishNumberWordsMap[minuteTens] ?? 0) + (englishNumberWordsMap[minuteUnits] ?? 0);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }

    if (words[0] === 'half' && isValidTimeNumber(words[1])) {
      hours = englishNumberWordsMap[words[1]];
      minutes = 30;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  }

  // If length is 3, check if it is half past, quarter past, or quarter to
  if (words.length === 3) {
    if (words[0] === 'half' && words[1] === 'past' && isValidTimeNumber(words[2])) {
      hours = englishNumberWordsMap[words[2]];
      minutes = 30;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    if (words[0] === 'quarter' && words[1] === 'past' && isValidTimeNumber(words[2])) {
      hours = englishNumberWordsMap[words[2]];
      minutes = 15;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    if (isValidTimeNumber(words[0]) && words[1] === 'past' && isValidTimeNumber(words[2])) {
      minutes = englishNumberWordsMap[words[0]] ?? 0;
      hours = englishNumberWordsMap[words[2]] ?? 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    if (words[1] === 'to') {
      if (words[0].includes('-')) {
        const [minutesTens, minutesUnits] = words[0].split('-');
        if (isValidTimeNumber(minutesTens) && isValidTimeNumber(minutesUnits) && isValidTimeNumber(words[2])) {
          const minutesTo = (englishNumberWordsMap[minutesTens] ?? 0) + (englishNumberWordsMap[minutesUnits] ?? 0);
          minutes = 60 - minutesTo;
          hours = englishNumberWordsMap[words[2]] - 1;
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
      }

      if (isValidTimeNumber(words[0]) && isValidTimeNumber(words[2])) {
        minutes = 60 - (englishNumberWordsMap[words[0]] ?? 0);
        hours = (englishNumberWordsMap[words[2]] ?? 0) - 1;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }

      if (words[0] === 'quarter' && isValidTimeNumber(words[2])) {
        minutes = 45;
        hours = (englishNumberWordsMap[words[2]] ?? 0) - 1;
        if (hours === 0) {
          hours = 12;
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }
  }

  return undefined;
}
