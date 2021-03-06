import type { Num } from './interface'
import { assertInt, assertPosInt, assert } from './util/check'
import { BigMath } from './util/bigint'
import { box } from './util/box'
import { primes, factors } from './_'

const numFactors = box(function (x:Num) : bigint {
    assertPosInt(x)

    const bx = BigInt(x)
    if (bx === 1n) return 1n

    const ps = primes(BigMath.sqrt(bx) + 1n)
    let count = 1n
    let div = bx
    let prev = div
    while (div > 1n) {
        for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (div < p * p) break

            let e = 1n
            while (div % p === 0n) {
                div /= p
                e++
            }
            if (e > 1) count *= e
        }

        if (div === prev) break
        prev = div
    }

    if (div > 1n) count *= 2n
    return count
})

const sumDigits = box(function (x:Num) : bigint {
    assertInt(x)

    let b = BigMath.abs(x)
    let s = 0n
    while (b > 0n) {
        s += b % 10n
        b /= 10n
    }
    return s
})

const maxProperFactor = box(function (x:Num) : bigint {
    assertInt(x)

    const b = BigMath.abs(x)
    assert(b <= 1n, 'Expect abx(x) to be greater than 1')

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
    return mf
})

const maxPrimeFactor = box(function (x:Num) : bigint {
    assertInt(x)

    const b = BigMath.abs(x)
    assert(b <= 1n, 'Expect abx(x) to be greater than 1')

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

    return mf
})

export {
    factors,
    numFactors,
    sumDigits,
    maxProperFactor,
    maxPrimeFactor,
}
