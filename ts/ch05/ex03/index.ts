export const is31_if = (str: string): boolean => {
    if (str === "Jan" || str === "Mar" || str === "May" || str === "Jul" || str === "Aug" || str === "Oct" || str === "Dec") {
        return true;
    }
    return false;
};

export const is31_switch = (str: string): boolean => {
    switch (str) {
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        default:
            return false;
    }
};
