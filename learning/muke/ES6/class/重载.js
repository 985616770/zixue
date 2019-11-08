class Calc {
    constructor() {}
    model(...args) {
        if (args.length === 0) {
            return this.zero();
        }
        if (args.length === 1) {
            return this.onlyOne(args);
        }
        return this.add(args);
    }
    zero() {
        return 0;
    }
    onlyOne(args) {
        return args[0];
    }
    add(args) {
        return args.reduce((a, b) => a + b, 0);
    }
}

function post(url, header, params) {
    if (!params) {
        params = header;
        header = null;
    }
}
