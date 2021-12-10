type str = string;
type int = number;
type char = string;
type bool = boolean;
type float = number;
type double = number;
type date = Date;

type RSAKeys = {
    public: {
        n: number;
        e: number;
    };
    private: {
        n: number;
        d: number;
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