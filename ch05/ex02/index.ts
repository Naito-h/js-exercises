export const toEscape1 = (str: string): string => {
    for (let char of str) {
        if (char === "\0") {
            str = str.replace(char, "\\0");
        } else if (char === "\b") {
            str = str.replace(char, "\\b");
        } else if (char === "\t") {
            str = str.replace(char, "\\t");
        } else if (char === "\n") {
            str = str.replace(char, "\\n");
        } else if (char === "\v") {
            str = str.replace(char, "\\v");
        } else if (char === "\f") {
            str = str.replace(char, "\\f");
        } else if (char === "\r") {
            str = str.replace(char, "\\r");
        } else if (char === "\"") {
            str = str.replace(char, "\\\"");
        } else if (char === "\'") {
            str = str.replace(char, "\\\'");
        } else if (char === "\\") {
            str = str.replace(char, "\\\\");
        }
    }
    return str;
};

export const toEscape2 = (str: string): string => {
    for (let char of str) {
        switch (char) {
            case "\0":
                str = str.replace(char, "\\0");
                break;
            case "\b":
                str = str.replace(char, "\\b");
                break;
            case "\t":
                str = str.replace(char, "\\t");
                break;
            case "\n":
                str = str.replace(char, "\\n");
                break;
            case "\v":
                str = str.replace(char, "\\v");
                break;
            case "\f":
                str = str.replace(char, "\\f");
                break;
            case "\r":
                str = str.replace(char, "\\r");
                break;
            case "\"":
                str = str.replace(char, "\\\"");
                break;
            case "\'":
                str = str.replace(char, "\\\'");
                break;
            case "\\":
                str = str.replace(char, "\\\\");
                break;  
        }
    }
    return str;
};
