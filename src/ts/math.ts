function modularExponentiation(a: int64, b: int64, m: int64): int64 {
    let res: int64 = 1n;
    a = a % m;
    if(a === 0n) return 0n;
    while(b > 0){
      if(b & 1n) res = (res * a) % m;
      b >>= 1n;
      a = (a * a) % m;
    }
    return res;
}
function modularInverse(a: int | int64, m: int | int64): int | int64 {
    // validate inputs
    [a, m] = [int(a), int(m)]
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
    return int64((y % m + m) % m)
}
  
function generatePrime(bits: int | int64): int64 {
    bits = int64(bits);
    let prime: int64 = getRandomInt(2n ** bits, 2n ** (bits + 1n));
    return prime;
}

function generateCoprime(n: int | int64): int64 {
  console.log('generateCoprime()');
  n = int64(n);
  let coprime: int64;
  do{
      coprime = getRandomPrime(2, n);
      console.log(coprime);
  } while(gcd(n, coprime) != 1n);
  return coprime;
}

function getRandomPrime(min: int | int64, max: int | int64): int64 {
  console.log('getRandomPrime()');
  let num: int64 = getRandomInt(min, max);
  if(!(num & 1n)){
    num++;
  }
  while (!isPrime(num)) {
      num+=2n;
  }
  console.log(num);
  return num;
}

function getRandomInt(min: int | int64, max: int | int64): int64 {
    return int64(Math.floor(int(Math.random() * int((int64(max) - int64(min) + 1n) + int64(min)))));
}

function isPrime(num: int64): bool {
    num = num;
    if (num <= 3n) return num > 1n;
    
    if ((num % 2n === 0n) || (num % 3n === 0n)) return false;
    
    let count: int64 = 5n;
    
    while (int64(Math.pow(int(count), 2)) <= num) {
      if (num % count == 0n || num % (count + 2n) == 0n) return false;
      
      count += 6n;
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
  if (b === 0n) {
        return a;
    }
    return gcd(b, a % b);
}
export { modularExponentiation, modularInverse, generatePrime, generateCoprime, getRandomPrime, lcm, gcd };