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

import * as numbers from './number';
function hash(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
    }
    return h;
}

function unhash(n: number): string {
    let s = '';
    while (n > 0) {
        s += String.fromCharCode(n & 0xff);
        n >>= 8;
    }
    return s;
}

function generateKeys(bits: number): { n: number, e: number, d: number } {
    const p = numbers.generatePrime(bits);
    const q = numbers.generatePrime(bits);
    const n = p * q;
    const lambda = numbers.lcm((p - 1), (q - 1));
    const e = numbers.generateCoprime(lambda);
    const d = numbers.modularInverse(e, lambda);
    return { n, e, d };
}

function encrypt(m: number, n: number, e: number): number {
    return numbers.modularExponentiation(m, e, n);
}

function decrypt(c: number, n: number, d: number): number {
    return numbers.modularExponentiation(c, d, n);
}

export { hash, generateKeys, encrypt, decrypt };