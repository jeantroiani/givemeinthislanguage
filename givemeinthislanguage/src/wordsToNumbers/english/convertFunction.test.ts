import { convertEnglishTextToTime } from './convertFunction';
import { describe, test, expect, it } from 'vitest';


describe('convertEnglishTextToTime', () => {
  it("should convert midnight to 00:00", () => {
    expect(convertEnglishTextToTime("midnight")).toBe("00:00");
  });

  it("should convert noon to 12:00", () => {
    expect(convertEnglishTextToTime("noon")).toBe("12:00");
  });

    it("should convert midday to 12:00", () => {
    expect(convertEnglishTextToTime("midday")).toBe("12:00");
  });

  it("should convert three o'clock to 3:00", () => {
    expect(convertEnglishTextToTime("three o'clock")).toBe("03:00");
  });

  it("should convert three twenty-five to 3:25", () => {
    expect(convertEnglishTextToTime("three twenty-five")).toBe("03:25");
  });

  it("should convert half past four to 4:30", () => {
    expect(convertEnglishTextToTime("half past four")).toBe("04:30");
  });

  it("should convert half seven to 7:30", () => {
    expect(convertEnglishTextToTime("half seven")).toBe("07:30");
  });

  it("should convert nine sixteen to 9:16", () => {
    expect(convertEnglishTextToTime("nine sixteen")).toBe("09:16");
  });

  it("should convert quarter past one to 1:15", () => {
    expect(convertEnglishTextToTime("quarter past one")).toBe("01:15");
  });

  it("should convert quarter past seven to 07:15", () => {
    expect(convertEnglishTextToTime("quarter past seven")).toBe("07:15");
  });

  it("should convert quarter to three to 02:45", () => {
    expect(convertEnglishTextToTime("quarter to three")).toBe("02:45");
  });

  it("should convert quarter to one to 12:45", () => {
    expect(convertEnglishTextToTime("quarter to one")).toBe("12:45");
  });

  it("should convert twenty-five to eleven to 10:35", () => {
    expect(convertEnglishTextToTime("twenty-five to eleven")).toBe("10:35");
  });

  it("should convert twenty past eleven to 11:20", () => {
    expect(convertEnglishTextToTime("twenty past eleven")).toBe("11:20");
  });

  it("should convert nine to nine to 08:51", () => {
    expect(convertEnglishTextToTime("nine to nine")).toBe("08:51");
  });

  it("should convert three-thirty to 03:30", () => {
    expect(convertEnglishTextToTime("three-thirty")).toBe("03:30");
  });

    it("should convert three forty to 03:40", () => {
    expect(convertEnglishTextToTime("three forty")).toBe("03:40");
  });

});