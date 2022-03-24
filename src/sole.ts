import { isPosInt, isInt } from './util/check'
import { BigMath } from './util/bigint'
import { primesUpTo } from './primality'

function sumDigits (x:number|bigint) : number {
    if (!isInt(x)) throw new Error('expect an integer')

    let b = BigMath.abs(x)
    let s = 0n
    while (b > 0n) {
        s += b % 10n
        b /= 10n
    }
    return Number(s)
}

function numDivisors (x:number) : number {
    if (!isPosInt(x)) throw new Error('expect a positive integer')
    if (x === 1) return 1

    const primes = primesUpTo(Math.floor(Math.sqrt(x)) + 1)

    let count = 1
    let div = x
    let prev = div
    while (div > 1) {
        for (let i = 0; i < primes.length; i++) {
            const p = primes[i]
            if (div < p * p) break

            let e = 1
            while (div % p === 0) {
                div /= p
                e++
            }
            if (e > 1) count *= e
        }

        if (div === prev) break
        prev = div
    }

    if (div > 1) count *= 2
    return count
}

export {
    sumDigits,
    numDivisors,
}
