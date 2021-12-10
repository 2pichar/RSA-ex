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

import * as math from './math';
import './types';

function generateKeys(bits: number): RSAKeys {
    const p = math.generatePrime(bits);
    const q = math.generatePrime(bits);
    const n = p * q;
    const lambda = math.lcm((p - 1), (q - 1));
    const e = math.generateCoprime(lambda);
    const d = math.modularInverse(e, lambda);
    return { public: { n, e }, private: { n, d } };
}

function encrypt(m: number, n: number, e: number): number {
    return math.modularExponentiation(m, e, n);
}

function decrypt(c: number, n: number, d: number): number {
    return math.modularExponentiation(c, d, n);
}

const NULLKEYS = {
    public: { n: 0, e: 0 },
    private: { n: 0, d: 0 }
};

export { generateKeys, encrypt, decrypt , NULLKEYS};