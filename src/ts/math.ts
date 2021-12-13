function modularExponentiation(a: int, b: int, m: int): int {
    let res: int = 1;
    a = a % m;
    if(a === 0) return 0;
    while(b > 0){
      if(b & 1) res = (res * x) % m;
      y >>= 1;
      x = (x * x) % m;
    }
    return res;
}
function modularInverse(a: int, m: int) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}
  
function generatePrime(bits: int): int64 {
    let prime: int64 = getRandomInt(2 ** bits, 2 ** (bits + 1));
    return prime;
}

function generateCoprime(n: int): int64 {
    let coprime: int;
    do{
        coprime = getRandomPrime(2, n);
    } while(gcd(n, coprime) != 1);
    return int64(coprime);
}

function getRandomPrime(min: int, max: int): int64 {
    let num: int64 = getRandomInt(min, max);
    while (!isPrime(num)) {
        num++;
    }
    return num;
}

function getRandomInt(min: int, max: int): int64 {
    return int64(Math.floor(Math.random() * (max - min + 1)) + min);
}

function isPrime(num: int | int64): bool {
    num = int64(num);
    if (num <= 3) return num > 1;
    
    if ((num % 2 === 0) || (num % 3 === 0)) return false;
    
    let count: int = 5;
    
    while (Math.pow(count, 2) <= num) {
      if (num % count === 0 || num % (count + 2) === 0) return false;
      
      count += 6;
    }
    
    return true;
  }

function lcm(a: int | int64, b: int | int64): int64 {
  a = int64(a);
  b = int64(b);  
  return int64(a * b / gcd(a, b));
}

function gcd(a: int | int64, b: int | int64): int64 {
  a = int64(a);
  b = int64(b);
  if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}
export { modularExponentiation, modularInverse, generatePrime, generateCoprime, getRandomPrime, lcm, gcd };