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
        value(){
            return Object.keys(this);
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    values: {
        value(){
            return Object.values(this);
        },
        enumerable: false,
        writable: false,
        configurable: false
    }
});

interface Object {
    keys(): string[];
    values(): any[];
}