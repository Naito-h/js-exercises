import { AlarmClock } from './index.ts';

describe('初期状態のテスト', () => {
    let alarmClock: AlarmClock;
    test('初期状態はNORMALであること', () => {
        alarmClock = new AlarmClock();
        expect(alarmClock.getState()).toBe("normal");
    });
});

describe('NORMALの状態のテスト', () => {
    let alarmClock: AlarmClock;

    beforeEach(() => {
        alarmClock = new AlarmClock();
        alarmClock.changeState("normal");
    });

    test('アラーム設定', () => {
        alarmClock.setAlarm();
        expect(alarmClock.getState()).toBe("alarmSet");
    });
    test('アラーム設定解除', () => {
        alarmClock.cancelAlarm();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('アラーム時刻到達', () => {
        alarmClock.reachedToAlarmTime();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('スヌーズ実行', () => {
        alarmClock.snooze();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('スヌーズ時間経過', () => {
        alarmClock.elapseSnoozeTime();
        expect(alarmClock.getState()).toBe("normal");
    });
});

describe('ALARM_SETの状態のテスト', () => {
    let alarmClock: AlarmClock;

    beforeEach(() => {
        alarmClock = new AlarmClock();
        alarmClock.changeState("alarmSet");
    });

    test('アラーム設定', () => {
        alarmClock.setAlarm();
        expect(alarmClock.getState()).toBe("alarmSet");
    });
    test('アラーム設定解除', () => {
        alarmClock.cancelAlarm();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('アラーム時刻到達', () => {
        alarmClock.reachedToAlarmTime();
        expect(alarmClock.getState()).toBe("alarmSounding");
    });
    test('スヌーズ実行', () => {
        alarmClock.snooze();
        expect(alarmClock.getState()).toBe("alarmSet");
    });
    test('スヌーズ時間経過', () => {
        alarmClock.elapseSnoozeTime();
        expect(alarmClock.getState()).toBe("alarmSet");
    });
});

describe('ALARM_SOUNDINGの状態のテスト', () => {
    let alarmClock: AlarmClock;

    beforeEach(() => {
        alarmClock = new AlarmClock();
        alarmClock.changeState("alarmSounding");
    });

    test('アラーム設定', () => {
        alarmClock.setAlarm();
        expect(alarmClock.getState()).toBe("alarmSounding");
    });
    test('アラーム設定解除', () => {
        alarmClock.cancelAlarm();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('アラーム時刻到達', () => {
        alarmClock.reachedToAlarmTime();
        expect(alarmClock.getState()).toBe("alarmSounding");
    });
    test('スヌーズ実行', () => {
        alarmClock.snooze();
        expect(alarmClock.getState()).toBe("snoozing");
    });
    test('スヌーズ時間経過', () => {
        alarmClock.elapseSnoozeTime();
        expect(alarmClock.getState()).toBe("alarmSounding");
    });
});

describe('SNOOZINGの状態のテスト', () => {
    let alarmClock: AlarmClock;

    beforeEach(() => {
        alarmClock = new AlarmClock();
        alarmClock.changeState("snoozing");
    });

    test('アラーム設定', () => {
        alarmClock.setAlarm();
        expect(alarmClock.getState()).toBe("snoozing");
    });
    test('アラーム設定解除', () => {
        alarmClock.cancelAlarm();
        expect(alarmClock.getState()).toBe("normal");
    });
    test('アラーム時刻到達', () => {
        alarmClock.reachedToAlarmTime();
        expect(alarmClock.getState()).toBe("snoozing");
    });
    test('スヌーズ実行', () => {
        alarmClock.snooze();
        expect(alarmClock.getState()).toBe("snoozing");
    });
    test('スヌーズ時間経過', () => {
        alarmClock.elapseSnoozeTime();
        expect(alarmClock.getState()).toBe("alarmSounding");
    });
});
