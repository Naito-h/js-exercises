export const polarCoordinates = {
    r: 2,
    theta: Math.PI / 2,

    get x() {
        return this.r * Math.cos(this.theta);
    },
    set x(value) {
        if (isNaN(value) || typeof value !== 'number') {
            throw new Error("must be a number");
        }
        this.r = Math.hypot(value, this.y);
        this.theta = Math.atan2(this.y, value);
    },
    get y() {
        return this.r * Math.sin(this.theta);
    },
    set y(value) {
        if (isNaN(value) || typeof value !== 'number') {
            throw new Error("must be a number");
        }
        this.r = Math.hypot(this.x, value);
        this.theta = Math.atan2(value, this.x);
    }
};