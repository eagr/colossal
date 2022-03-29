import { isPosInt, isInt } from './util/check'
import { BigMath } from './util/bigint'
import { primes } from './primality'

type Num = number | bigint

function numDivisors (x:number) : number {
    if (!isPosInt(x)) throw new Error('expect a positive integer')
    if (x === 1) return 1

    const ps = primes(Math.floor(Math.sqrt(x)) + 1)

    let count = 1
    let div = x
    let prev = div
    while (div > 1) {
        for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
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

function sumDigits (x:Num) : number {
    if (!isInt(x)) throw new Error('expect an integer')

    let b = BigMath.abs(x)
    let s = 0n
    while (b > 0n) {
        s += b % 10n
        b /= 10n
    }
    return Number(s)
}

function maxProperFactor<T extends Num> (x:T) : T {
    if (!isInt(x)) throw new Error('expect an integer')

    const isNumber = typeof x === 'number'
    const b = BigMath.abs(x)
    if (b <= 1n) throw new Error('expect abx(x) to be greater than 1')

    let mf = 1n
    if (b % 2n === 0n) {
        mf = b / 2n
    } else {
        const limit = BigMath.sqrt(b)
        for (let i = 3n; i <= limit; i += 2n) {
            if (b % i === 0n) {
                mf = b / i
                break
            }
        }
    }

    return (isNumber ? Number(mf) : mf) as T
}

function maxPrimeFactor<T extends Num> (x:T) : T {
    if (!isInt(x)) throw new Error('expect an integer')

    const isNumber = typeof x === 'number'
    const b = BigMath.abs(x)
    if (b <= 1n) throw new Error('expect abx(x) to be greater than 1')

    let mf = b

    // order matters
    while (mf % 2n === 0n && mf > 2n) mf /= 2n
    while (mf % 3n === 0n && mf > 3n) mf /= 3n

    let i = 5n
    while (i <= BigMath.sqrt(mf)) {
        if (mf % i === 0n) {
            mf /= i
            i = 5n
        } else if (mf % (i + 2n) === 0n) {
            mf /= i + 2n
            i = 5n
        } else {
            i += 6n
        }
    }

    return (isNumber ? Number(mf) : mf) as T
}

export {
    numDivisors,
    sumDigits,
    maxProperFactor,
    maxPrimeFactor,
}
