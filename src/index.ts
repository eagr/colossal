import { isInt, isNonNegInt, isPosInt } from './util'

function isPrime (x:number) : boolean {
    if (!isInt(x)) throw new Error('`x` should be an integer')
    if (x <= 3) return x > 1
    if (x % 2 === 0 || x % 3 === 0) return false

    const hi = Math.floor(Math.sqrt(x))
    for (let i = 5; i <= hi; i += 6) {
        if (x % i === 0 || x % (i + 2) === 0) return false
    }
    return true
}

function sieveOfEratosthenes (limit:number) : boolean[] {
    if (!isInt(limit) || limit < 2) throw new Error('`limit` should be an integer no less than 2')

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

function gcd (x:number, y:number) : number {
    if (!isInt(x) || !isInt(y)) throw new Error('both numbers should be integers')
    if (x === 0 && y === 0) throw new Error('gcd(0, 0) is undefined')
    if (x === 0) return y
    if (y === 0) return x

    const l = Math.max(x, y)
    let s = Math.min(x, y)
    let r = l % s

    while (r > 0) {
        const rem = s % r
        s = r
        r = rem
    }
    return Math.abs(s)
}

function lcm (x:number, y:number) : number {
    if (!isNonNegInt(x) || !isNonNegInt(y)) throw new Error('both numbers should be non-negative integers')
    if (x === 0 || y === 0) return 0
    return x * y / gcd(x, y)
}

/**
 * Calculate the sum of the first `n` positive integers, each to the power of `k`.
 * @param {number} n - the first `n` positive integers
 * @param {number} k - power of the integers, can be either 1, 2, or 3
 */
function sumOf (n:number, p=1) : number {
    if (!isPosInt(n)) throw new Error('`n` must be a positive integer')
    if (p !== 1 && p !== 2 && p !== 3) throw new Error('`k` is either 1, 2, or 3')
    if (p === 1) return n * (1 + n) / 2
    if (p === 2) return n * (n + 1) * (2 * n + 1) / 6
    return n * n * (n + 1) * (n + 1) / 4
}

export {
    isPrime,
    sieveOfEratosthenes,
    gcd,
    lcm,
    sumOf,
}
