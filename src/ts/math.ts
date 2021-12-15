import './types.js';
import {checkPrimeSync as checkPrime} from 'crypto';

function modularExponentiation(x: int64, y: int64, m: int64): int64
{
    // Initialize result
    let res = 1n;
 
    // Update x if it is more
    // than or equal to p
    x = x % m;
 
    if (x == 0n)
        return 0n;
 
    while (y > 0)
    {
        // If y is odd, multiply
        // x with result
        if (y & 1n)
            res = (res * x) % m;
 
        // y must be even now
         
        // y = $y/2
        y = y >> 1n;
        x = (x * x) % m;
    }
    return res;
}
function modularInverse(a: int | int64, m: int | int64): int | int64 {
  console.log('modularInverse()');
  // validate inputs
  [a, m] = [int64(a), int64(m)]
  if (Number.isNaN(a) || Number.isNaN(m)) {
    console.log('NaN1');
    return NaN // invalid input
  }
  a = (a % m + m) % m
  if (!a || m < 2) {
    console.log('NaN2');
    return NaN // invalid input
  }
  // find the gcd
  const s: {a: int64, b: int64}[] = []
  let b: int64 = m
  while(b) {
    [a, b] = [b, a % b];
    console.log(a, b);
    s.push({a, b})
  }
  if (a !== 1n) {
    console.log('NaN3');
    return NaN // inverse does not exists
  }
  // find the inverse
  let x = 1n
  let y = 0n
  for(let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y,  x - y * s[i].a / s[i].b]
  }
  return int64((y % m + m) % m)
}
  
function generatePrime(bits: int | int64): int64 {
  console.log('generatePrime()');
    bits = int64(bits);
    let prime: int64 = getRandomPrime(2n ** bits, 2n ** (bits + 1n));
    return prime;
}

function generateCoprime(n: int | int64): int64 {
  console.log('generateCoprime()');
  n = int64(n);
  return n - 1n;
}

function getRandomPrime(min: int | int64, max: int | int64): int64 {
  console.log('getRandomPrime()');
  let num: int64 = getRandomInt(min, max);
  if(!(num & 1n)){
    num++;
  }
  console.log(num);
  while (!checkPrime(num)) {
      num+=2n;
      console.log(num);
  }
  console.log(num);
  return num;
}

function getRandomInt(min: int | int64, max: int | int64): int64 {
  console.log('getRandomInt()');
  return int64(Math.floor(int(Math.random() * int((int64(max) - int64(min) + 1n) + int64(min)))));
}

function isPrime(num: int64): bool {
  console.log('isPrime()');
  if (num <= 3n) return num > 1n;
  
  if ((num % 2n === 0n) || (num % 3n === 0n)) return false;
  
  let count: int64 = 5n;
  
  while (int64(Math.pow(int(count), 2)) <= sqrt(num)) {
    if (num % count == 0n || num % (count + 2n) == 0n) return false;
    
    count += 6n;
  }
  
  return true;
  }

function lcm(a: int | int64, b: int | int64): int64 {
  console.log('lcm()');
  a = int64(a);
  b = int64(b);  
  return int64(a * b / gcd(a, b));
}

function gcd(a: int | int64, b: int | int64): int64 {
  console.log('gcd()');
  a = int64(a);
  b = int64(b);
  if (b === 0n) {
        return a;
    }
    return gcd(b, a % b);
}

function sqrt(value: int64){
  // From https://golb.hplar.ch/2018/09/javascript-bigint.html
  let k: int64 = 2n;
  if (value < 0n) {
    throw RangeError('negative number is not supported');
  }

  let o: int64 = 0n;
  let x: int64 = value;
  let limit: int = 100;

  while (x ** k !== k && x !== o && --limit) {
    o = x;
    x = ((k - 1n) * x + value / x ** (k - 1n)) / k;
  }

  return x;
}
export { modularExponentiation, modularInverse, generatePrime, generateCoprime, getRandomPrime, getRandomInt, isPrime, lcm, gcd, sqrt };