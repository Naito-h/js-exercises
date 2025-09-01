export const f = (func: string) => {
    if (!func.includes("return")) {
        func = `return ${func}`;
    }
    return new Function("$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9","$10", func.toString());
}