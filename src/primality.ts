import { isInt } from './util/check'

function isPrime (x:number) : boolean {
    if (!isInt(x)) throw new Error('input should be an integer')
    if (x <= 3) return x > 1
    if (x % 2 === 0 || x % 3 === 0) return false

    const hi = Math.floor(Math.sqrt(x))
    for (let i = 5; i <= hi; i += 6) {
        if (x % i === 0 || x % (i + 2) === 0) return false
    }
    return true
}

function sieveOfEratosthenes (limit:number) : boolean[] {
    if (!isInt(limit) || limit < 2) throw new Error('expect an integer no less than 2')

    const sieve = new Array(limit)
    for (let i = 0; i < limit; i += 2) sieve[i] = false
    if (limit > 1) sieve[1] = false
    if (limit > 2) sieve[2] = true
    for (let i = 3; i < limit; i += 2) sieve[i] = true

    const maxOdd = limit - 1 - (limit % 2)
    const cross = Math.floor(Math.sqrt(maxOdd))

    for (let i = 3; i <= cross; i += 2) {
        if (sieve[i]) {
            for (let j = i * i; j <= maxOdd; j += i) {
                sieve[j] = false
            }
        }
    }
    return sieve
}

function primesUpTo (limit:number) : number[] {
    const sieve = sieveOfEratosthenes(limit)
    const primes:number[] = []
    for (let i = 0; i < limit; i++) {
        if (sieve[i]) primes.push(i)
    }
    return primes
}

export {
    isPrime,
    sieveOfEratosthenes,
    primesUpTo,
}
