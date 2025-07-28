export class PolarCoordinates {
    public r: number;
    public theta: number;

    constructor(r: number, theta: number) {
        if (isNaN(r) || typeof r !== 'number' || isNaN(theta) || typeof theta !== 'number') {
            throw new Error("r and theta must be numbers");
        }
        this.r = r;
        this.theta = theta;
    }

    get x(): number {
        return this.r * Math.cos(this.theta);
    }

    set x(value: number) {
        if (isNaN(value) || typeof value !== 'number') {
            throw new Error("must be a number");
        }
        const y = this.r * Math.sin(this.theta);
        this.r = Math.hypot(value, y);
        this.theta = Math.atan2(y, value);
    }

    get y(): number {
        return this.r * Math.sin(this.theta);
    }

    set y(value: number) {
        if (isNaN(value) || typeof value !== 'number') {
            throw new Error("must be a number");
        }
        const x = this.r * Math.cos(this.theta);
        this.r = Math.hypot(x, value);
        this.theta = Math.atan2(value, x);
    }
};
