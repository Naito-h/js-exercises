// // 目覚まし時計の状態
// export const State = Object.freeze({
//     NORMAL: Symbol("normal"), // 通常
//     ALARM_SET: Symbol("alarmSet"), // アラームセット中
//     ALARM_SOUNDING: Symbol("alarmSounding"), // アラーム鳴動中
//     SNOOZING: Symbol("snoozing"), // スヌーズ中
// });

// // イベント時に発生するアクション
// export const Action = Object.freeze({
//     NONE: Symbol("none"), // 何もしない
//     SOUND_ALARM: Symbol("soundAlarm"), // アラームを鳴らす
//     STOP_ALARM: Symbol("stopAlarm"), // アラームを止める
// });

// 補足:
// JavaScript では 列挙型を上記のように記述するが
// TypeScript では 列挙型を `type Action = "none" | "soundAlarm" | "stopAlarm";` のように代数的データ型を使って記述するのが一般的

type State = "normal" | "alarmSet" | "alarmSounding" | "snoozing";
type Action = "none" | "soundAlarm" | "stopAlarm";

// 状態ごとの処理を行うためのインターフェース
interface IState {
    state: State;
    action: Action;
    setAlarm(alarmClock: AlarmClock): void;
    cancelAlarm(alarmClock: AlarmClock): void;
    reachedToAlarmTime(alarmClock: AlarmClock): void;
    snooze(alarmClock: AlarmClock): void;
    elapseSnoozeTime(alarmClock: AlarmClock): void;
}

// 通常状態のクラス
class Normal implements IState {
    state: State = "normal";
    action: Action = "none";
    setAlarm(alarmClock: AlarmClock) {
        // アラームセット中状態へ遷移
        alarmClock.changeState("alarmSet");
    }
    cancelAlarm(alarmClock: AlarmClock) {
        // 何もしない
    }
    reachedToAlarmTime(alarmClock: AlarmClock) {
        // 何もしない
    }
    snooze(alarmClock: AlarmClock) {
        // 何もしない
    }
    elapseSnoozeTime(alarmClock: AlarmClock) {
        // 何もしない
    }
}

// アラームセット中状態のクラス
class AlarmSet implements IState {
    state: State = "alarmSet";
    action: Action = "none";
    setAlarm(alarmClock: AlarmClock) {
        // 何もしない
    }
    cancelAlarm(alarmClock: AlarmClock) {
        // 通常状態へ遷移
        alarmClock.changeState("normal");
    }
    reachedToAlarmTime(alarmClock: AlarmClock) {
        // アラーム鳴動中状態へ遷移
        alarmClock.changeState("alarmSounding");
    }
    snooze(alarmClock: AlarmClock) {
        // 何もしない
    }
    elapseSnoozeTime(alarmClock: AlarmClock) {
        // 何もしない
    }
}

// アラーム鳴動中状態のクラス
class AlarmSounding implements IState {
    state: State = "alarmSounding";
    action: Action = "soundAlarm";
    setAlarm(alarmClock: AlarmClock) {
        // 何もしない
    }
    cancelAlarm(alarmClock: AlarmClock) {
        // 通常状態へ遷移
        alarmClock.changeState("normal");
    }
    reachedToAlarmTime(alarmClock: AlarmClock) {
        // 何もしない
    }
    snooze(alarmClock: AlarmClock) {
        // スヌーズ中状態へ遷移
        alarmClock.changeState("snoozing");
    }
    elapseSnoozeTime(alarmClock: AlarmClock) {
        // 何もしない
    }
}

// スヌーズ中状態のクラス
class Snoozing implements IState {
    state: State = "snoozing";
    action: Action = "none";
    setAlarm(alarmClock: AlarmClock) {
        // 何もしない
    }
    cancelAlarm(alarmClock: AlarmClock) {
        // 通常状態へ遷移
        alarmClock.changeState("normal");
    }
    reachedToAlarmTime(alarmClock: AlarmClock) {
        // 何もしない
    }
    snooze(alarmClock: AlarmClock) {
        // 何もしない
    }
    elapseSnoozeTime(alarmClock: AlarmClock) {
        // アラーム鳴動中状態へ遷移
        alarmClock.changeState("alarmSounding");
    }
}

// 目覚まし時計クラス
export class AlarmClock {
    #state: IState;

    constructor() {
        this.#state = new Normal();
    }

    // 状態を変更
    changeState(state: State) {
        switch (state) {
            case "normal":
                this.#state = new Normal();
                break;
            case "alarmSet":
                this.#state = new AlarmSet();
                break;
            case "alarmSounding":
                this.#state = new AlarmSounding();
                break;
            case "snoozing":
                this.#state = new Snoozing();
                break;
            default:
                throw new Error(`Unknown state: ${state}`);
        }
    }

    // 現在の状態を取得
    getState() {
        return this.#state.state;
    }

    // アラーム設定イベント
    setAlarm() {
        this.#state.setAlarm(this);
    }

    // アラーム解除イベント
    cancelAlarm() {
        this.#state.cancelAlarm(this);
    }

    // アラーム設定時刻到達イベント
    reachedToAlarmTime() {
        this.#state.reachedToAlarmTime(this);
    }

    // スヌーズイベント
    snooze() {
        this.#state.snooze(this);
    }

    // スヌーズ設定時間経過イベント
    elapseSnoozeTime() {
        this.#state.elapseSnoozeTime(this);
    }
}
