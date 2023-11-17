/* complexCode.js */

// This code demonstrates a complex algorithm for finding prime numbers within a given range.
// It utilizes various mathematical optimizations to improve performance.

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0)
      return false;
    i += 6;
  }

  return true;
}

function findPrimesInRange(start, end) {
  let primes = [];

  if (start > end) {
    [start, end] = [end, start]; // Swap values if start is greater than end
  }

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

function printPrimes(primes) {
  console.log("Prime Numbers Found:");
  primes.forEach((prime) => console.log(prime));
}

(function main() {
  const start = 1;
  const end = 1000;
  const primes = findPrimesInRange(start, end);
  printPrimes(primes);
})();

// Other utility functions and helper code can be added below...