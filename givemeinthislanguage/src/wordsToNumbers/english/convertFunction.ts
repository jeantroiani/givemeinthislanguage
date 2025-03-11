import { englishNumberWordsMap } from "./numbersMap";
import { stringStartsWithItIs } from "./utils/stringStartsWithItIs";

 export function convertEnglishTextToTime(text: string): string | undefined {
    const words = text.toLowerCase().split(' ');
  
    // check if the text starts with "it's" or "it is"
  if (stringStartsWithItIs(words)) {
    words.shift();
  } 

    let hours = 0;
    let minutes = 0;

    // if length is 1, check if it is midnight or noon
    if (words.length === 1) {
      if (words[0] === 'midnight') {
        return '00:00';
      } else if (words[0] === 'noon') {
        return '12:00';
      } else if (words[0] === 'midday') {
        return '12:00';
      }
    }

    // if length is 1 and it contains a hyphen and after splitting both are valid time numbers, check if it is a time
    if (words.length === 1 && words[0].includes('-') && words[0].split('-').length === 2) {
      const [hourTens, hourUnits] = words[0].split('-');
      if (englishNumberWordsMap[hourTens] !== undefined && englishNumberWordsMap[hourUnits] !== undefined) {
        hours = englishNumberWordsMap[hourTens] 
        minutes = englishNumberWordsMap[hourUnits];
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }

    // if length is 2, check if it is o'clock
    if (words.length === 2) { 
      if (words[1] === "o'clock") {
        hours = englishNumberWordsMap[words[0]];
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }

    //if length is 2 and both are valid time numbers, check if it is a time
    if (words.length === 2 && englishNumberWordsMap[words[0]] !== undefined && englishNumberWordsMap[words[1]] !== undefined) {
      hours = englishNumberWordsMap[words[0]];
      minutes = englishNumberWordsMap[words[1]];
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // if length is 2 and the second word is separated by a hyphen, check if it is a time
    if (words.length === 2 && words[1].includes('-')) { 
      const hourWord = words[0];
      const [minuteTens, minuteUnits] = words[1].split('-');

      if (englishNumberWordsMap[hourWord] !== undefined && englishNumberWordsMap[minuteTens] !== undefined && englishNumberWordsMap[minuteUnits] !== undefined) {
        hours = englishNumberWordsMap[hourWord];
        minutes = englishNumberWordsMap[minuteTens] + englishNumberWordsMap[minuteUnits];
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }

    // if length is 2 and the first word is half and second word is valid number, check if it is half past
    if (words.length === 2 && words[0] === 'half' && englishNumberWordsMap[words[1]] !== undefined) {
      hours = englishNumberWordsMap[words[1]];
      minutes = 30;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // if length is 3, check if it is half past
    if (words.length === 3 && words[0] === 'half' && words[1] === 'past') {
      hours = englishNumberWordsMap[words[2]];
      minutes = 30;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // if length is 3, check if it is quarter past
    if (words.length === 3 && words[0] === 'quarter' && words[1] === 'past') {
      hours = englishNumberWordsMap[words[2]];
      minutes = 15;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // if length is 3 the first is a valid time number and the second word is past and the third word is a valid number, check if it is a time
    if (words.length === 3 && englishNumberWordsMap[words[0]] !== undefined && words[1] === 'past' && englishNumberWordsMap[words[2]] !== undefined) {
      minutes = englishNumberWordsMap[words[0]];
      hours = englishNumberWordsMap[words[2]];
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    //if length is 3 the first is a valid number with hyphen the second word is to and the third word is a valid number, check if it is a quarter to
    if (words.length === 3 && words[1] === 'to' && words[0].includes('-') && englishNumberWordsMap[words[2]] !== undefined) {
      const [minutesTens, minutesUnits] = words[0].split('-');
      const minutesTo = englishNumberWordsMap[minutesTens] + englishNumberWordsMap[minutesUnits];
      minutes = 60 - minutesTo;
      hours = englishNumberWordsMap[words[2]] - 1;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    //if length is 3 the first is a valid number the second word is to and the third word is a valid number, check if it is a quarter to
    if (words.length === 3 && words[1] === 'to' && englishNumberWordsMap[words[0]] !== undefined && englishNumberWordsMap[words[2]] !== undefined) {  
      minutes = 60 - englishNumberWordsMap[words[0]];
      hours = englishNumberWordsMap[words[2]] - 1;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // if length is 3 and the first word is quarter and the second word is to and the third word is a valid number, check if it is a quarter to
    if (words.length === 3 && words[0] === 'quarter' && words[1] === 'to' && englishNumberWordsMap[words[2]] !== undefined) {
      minutes = 45;
      hours = englishNumberWordsMap[words[2]] - 1;
      // if hours is zero, set it to 12
      if (hours === 0) {
        hours = 12;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return undefined;

  }