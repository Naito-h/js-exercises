import { getDays, getBusinessDays, getLocaleDayOfWeek, getLastMonthFirstDate,  } from "./index.ts";

describe("getDays", () => {
    test("2023年1月の全日を取得", () => {
        const days = getDays(2023, 1);
        expect(days).toBe(31);
    });
    test("2023年2月の全日を取得", () => {
        const days = getDays(2023, 2);
        expect(days).toBe(28);
    });
    test("2024年2月の全日を取得（うるう年）", () => {
        const days = getDays(2024, 2);
        expect(days).toBe(29);
    });
    test("月に1-12以外を指定した場合", () => {
        expect(() => getDays(2024, 0)).toThrowError("monthは1から12の間で指定してください");
        expect(() => getDays(2024, 13)).toThrowError("monthは1から12の間で指定してください");
    });
});

describe("getBusinessDays", () => {
    test("2023-01-01から2023-01-31までの土日以外の日数を取得", () => {
        const businessDays = getBusinessDays("2023-01-01", "2023-01-31");
        expect(businessDays).toBe(22);
    });
    test("2023-01-01から2023-12-31までの土日以外の日数を取得", () => {
        const businessDays = getBusinessDays("2023-01-01", "2023-12-31");
        expect(businessDays).toBe(260);
    });
    test("不正な日付を指定した場合", () => {
        expect(() => getBusinessDays("2023-01-32", "2023-01-31")).toThrowError("不正な日付です");
        expect(() => getBusinessDays("invalid-date", "2023-01-31")).toThrowError("不正な日付です");
    });
    test("開始日が終了日より後の日付を指定した場合", () => {
        expect(() => getBusinessDays("2023-02-01", "2023-01-31")).toThrowError("開始日は終了日より前の日付を指定してください");
    });
});

describe("getLocaleDayOfWeek", () => {
    test("2023-01-01の曜日を取得", () => {
        const dayOfWeek = getLocaleDayOfWeek("2023-01-01");
        expect(dayOfWeek).toBe("日曜日");
    });
    test("2023-12-25の曜日を取得", () => {
        const dayOfWeek = getLocaleDayOfWeek("2023-12-25");
        expect(dayOfWeek).toBe("月曜日");
    });
    test("不正な日付を指定した場合", () => {
        expect(() => getLocaleDayOfWeek("2023-13-01")).toThrowError("不正な日付です");
        expect(() => getLocaleDayOfWeek("invalid-date")).toThrowError("不正な日付です");
    });
});

describe("getLastMonthFirstDate", () => {
    test("先月の1日の日付オブジェクトを取得", () => {
        const lastMonthFirstDate = getLastMonthFirstDate();
        expect(lastMonthFirstDate).toBeInstanceOf(Date);
    });
});

