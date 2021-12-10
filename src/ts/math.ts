function modularExponentiation(a: int, b: int, m: int): int {
    return (a ** b) % m;
}
function modularInverse(a: int, m: int): int {
    let t: int = 0;
    let newt: int = 1;
    let r: int = m;
    let newr: int = a;
    while (newr != 0) {
        let quotient: int = Math.floor(r / newr);
        let temp: int = newt;
        newt = t - quotient * newt;
        t = temp;
        temp = newr;
        newr = r - quotient * newr;
        r = temp;
    }
    if (r > 1) {
        return -1;
    }
    if (t < 0) {
        t = t + m;
    }
    return t;
}
function generatePrime(bits: int): int {
    let prime: int = getRandomInt(2 ** bits, 2 ** (bits + 1));
    return prime;
}

function generateCoprime(n: int): int {
    let coprime: int;
    do{
        coprime = getRandomPrime(2, n);
    } while(gcd(n, coprime) != 1);
    return coprime;
}

function getRandomPrime(min: int, max: int): int {
    let num: int = getRandomInt(min, max);
    while (!isPrime(num)) {
        num++;
    }
    return num;
}

function getRandomInt(min: int, max: int): int {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(num: int): bool {
    if (num <= 3) return num > 1;
    
    if ((num % 2 === 0) || (num % 3 === 0)) return false;
    
    let count: int = 5;
    
    while (Math.pow(count, 2) <= num) {
      if (num % count === 0 || num % (count + 2) === 0) return false;
      
      count += 6;
    }
    
    return true;
  }

function lcm(a: int, b: int): int {
    return a * b / gcd(a, b);
}

function gcd(a: int, b: int): int {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}
export { modularExponentiation, modularInverse, generatePrime, generateCoprime, getRandomPrime, lcm, gcd };