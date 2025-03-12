import { convertEnglishTextToTime } from './convertFunction';
import { describe, test, expect, it } from 'vitest';


describe('convertEnglishTextToTime', () => {
  const testCases = [
    { input: "midnight", expected: "00:00" },
    { input: "noon", expected: "12:00" },
    { input: "midday", expected: "12:00" },
    { input: "three o'clock", expected: "03:00" },
    { input: "three twenty-five", expected: "03:25" },
    { input: "half past four", expected: "04:30" },
    { input: "half seven", expected: "07:30" },
    { input: "nine sixteen", expected: "09:16" },
    { input: "quarter past one", expected: "01:15" },
    { input: "quarter past seven", expected: "07:15" },
    { input: "quarter to three", expected: "02:45" },
    { input: "quarter to one", expected: "12:45" },
    { input: "twenty-five to eleven", expected: "10:35" },
    { input: "twenty past eleven", expected: "11:20" },
    { input: "nine to nine", expected: "08:51" },
    { input: "three-thirty", expected: "03:30" },
    { input: "three forty", expected: "03:40" },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(convertEnglishTextToTime(input)).toBe(expected);
    });
  });

});