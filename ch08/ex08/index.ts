export function counterGroup () {
    let index: number = 0;
    let counterTotals: number[] = [];
    return {
        newCounter: function () {
            const thisIndex = index++;
            let n: number = 0;
            counterTotals[thisIndex] = 0;
            return {
                count: function () { 
                    counterTotals[thisIndex]++;
                    return n++;
                },
                reset: function () { 
                    counterTotals[thisIndex] = 0;
                    n = 0;
                }
            };
        },
        total: function () { return counterTotals.reduce((a, b) => a + b, 0); },
        average: function () { 
            if (counterTotals.length === 0) {
                throw new TypeError;
            }
            return this.total() / counterTotals.length;
        },
        variance: function () {
            if (counterTotals.length < 2) {
                throw new TypeError;
            }
            const mean = this.average();
            let sumOfSquares = 0;
            for (let i = 0; i < counterTotals.length; i++) {
                const deviation = counterTotals[i] - mean;
                sumOfSquares += deviation * deviation;
            }
            return sumOfSquares / counterTotals.length;
        }
    };
}