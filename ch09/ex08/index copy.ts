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
    setAlarm(): void;
    cancelAlarm(): void;
    reachedToAlarmTime(): void;
    snooze(): void;
    elapseSnoozeTime(): void;
}

// 通常状態のクラス
class Normal implements IState {
    state: State = "normal";
    action: Action = "none";
    setAlarm() {
        // アラームセット中状態へ遷移
        return { state: "alarmSet", action: "none" };
    }
    cancelAlarm() {
        // 何もしない
        return { state: "normal", action: "none" };
    }
    reachedToAlarmTime() {
        // 何もしない
        return { state: "normal", action: "none" };
    }
    snooze() {
        // 何もしない
        return { state: "normal", action: "none" };
    }
    elapseSnoozeTime() {
        // 何もしない
        return { state: "normal", action: "none" };
    }
}

// アラームセット中状態のクラス
class AlarmSet implements IState {
    state: State = "alarmSet";
    action: Action = "none";
    setAlarm() {
        // 何もしない
        return { state: "alarmSet", action: "none" };
    }
    cancelAlarm() {
        // 通常状態へ遷移
        return { state: "normal", action: "none" };
    }
    reachedToAlarmTime() {
        // アラーム鳴動中状態へ遷移
        return { state: "alarmSounding", action: "soundAlarm" };
    }
    snooze() {
        // 何もしない
        return { state: "alarmSet", action: "none" };
    }
    elapseSnoozeTime() {
        // 何もしない
        return { state: "alarmSet", action: "none" };
    }
}

// アラーム鳴動中状態のクラス
class AlarmSounding implements IState {
    state: State = "alarmSounding";
    action: Action = "soundAlarm";
    setAlarm() {
        // 何もしない
    }
    cancelAlarm() {
        // 通常状態へ遷移
        return { state: "normal", action: "none" };
    }
    reachedToAlarmTime() {
        // 何もしない
    }
    snooze() {
        // スヌーズ中状態へ遷移
        return { state: "snoozing", action: "none" };
    }
    elapseSnoozeTime() {
        // 何もしない
    }
}

// スヌーズ中状態のクラス
class Snoozing implements IState {
    state: State = "snoozing";
    action: Action = "none";
    setAlarm() {
        // 何もしない
    }
    cancelAlarm() {
        // 通常状態へ遷移
        return { state: "normal", action: "none" };
    }
    reachedToAlarmTime() {
        // 何もしない
    }
    snooze() {
        // 何もしない
    }
    elapseSnoozeTime() {
        // アラーム鳴動中状態へ遷移
        return { state: "alarmSounding", action: "none" };
    }
}

// 目覚まし時計クラス
export class AlarmClock {
    #state: IState;

    constructor() {
        this.#state = new Normal();
    }

    // // 状態を変更
    // changeState(state: State) {
    //     switch (state) {
    //         case "normal":
    //             this.#state = new Normal();
    //             break;
    //         case "alarmSet":
    //             this.#state = new AlarmSet();
    //             break;
    //         case "alarmSounding":
    //             this.#state = new AlarmSounding();
    //             break;
    //         case "snoozing":
    //             this.#state = new Snoozing();
    //             break;
    //         default:
    //             throw new Error(`Unknown state: ${state}`);
    //     }
    // }

    // 現在の状態を取得
    getState() {
        return this.#state.state;
    }

    // アラーム設定イベント
    setAlarm() {
        this.#state.setAlarm();
    }

    // アラーム解除イベント
    cancelAlarm() {
        this.#state.cancelAlarm();
    }

    // アラーム設定時刻到達イベント
    reachedToAlarmTime() {
        this.#state.reachedToAlarmTime();
    }

    // スヌーズイベント
    snooze() {
        this.#state.snooze();
    }

    // スヌーズ設定時間経過イベント
    elapseSnoozeTime() {
        this.#state.elapseSnoozeTime();
    }
}

// 動作確認
const alarmClock = new AlarmClock();
console.log(alarmClock.getState()); // normal
alarmClock.setAlarm();
console.log(alarmClock.getState()); // alarmSet
