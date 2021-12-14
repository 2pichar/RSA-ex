type str = string;
type int = number;
type int64 = bigint;
type char = string;
type bool = boolean;
type float = number;
type double = number;
type date = Date;

type RSAKeys = {
    public: {
        n: int64;
        e: int64;
    };
    private: {
        n: int64;
        d: int64;
    };
};

Object.defineProperties(Object.prototype, {
    keys: {
        value(): str[]{
            return Object.keys(this);
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    values: {
        value(): unknown[]{
            return Object.values(this);
        },
        enumerable: false,
        writable: false,
        configurable: false
    }
});

interface Object {
    keys(): str[];
    values(): unknown[];
}

function int(n: any = 0): int {
    return Number(n)
}

function int64(n: int | int64 | str | char | bool): int64{
    return BigInt(n);
}


global.int = int;
global.int64 = int64;