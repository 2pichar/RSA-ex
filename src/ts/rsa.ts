/*
Key Generation:
primes p & q
n = p * q
lambda n = lcm(p-1, q-1)
e coprime to lambda, 1 < e < lambda (e prime and does not divide lambda)
d = e^-1 mod lambda; d * e = 1 (mod lambda)

encryption:
convert plaintext to integer (hash? something else?)
0 <= m < n
m^e mod n = c

decryption:
c^d mod n = m
*/

import * as math from './math.js';
import './types.js';

function generateKeys(bits: int): RSAKeys {
    const p: int64 = math.generatePrime(bits);
    const q: int64 = math.generatePrime(bits);
    const n: int64 = p * q;
    const lambda: int64 = math.lcm((p - 1n), (q - 1n));
    const e: int64 = math.generateCoprime(lambda);
    let d = math.modularInverse(e, lambda);
    d = (typeof d === 'number') ? null : d;
    return { public: { n, e }, private: { n, d } };
}

function encrypt(m: int | int64, n: int64, e: int64): int64 {
    return math.modularExponentiation(int64(m), e, n);
}

function decrypt(c: int | int64, n: int64, d: int64): int64 {
    return math.modularExponentiation(int64(c), d, n);
}

const NULL: RSAKeys = {
    public: { n: 0n, e: 0n },
    private: { n: 0n, d: 0n }
};

export { generateKeys, encrypt, decrypt , NULL};