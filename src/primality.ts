import type { Num } from './interface'
import { assertInt, assertRange, isInt, isBigint } from './util/check'
import { BigMath } from './util/bigint'

function isPrime (x:Num) : boolean {
    assertInt(x)

    const bx = BigInt(x)
    if (bx <= 3n) return bx > 1n
    if (bx % 2n === 0n || bx % 3n === 0n) return false

    const hi = BigMath.sqrt(bx)
    for (let i = 5n; i <= hi; i += 6n) {
        if (bx % i === 0n || bx % (i + 2n) === 0n) return false
    }
    return true
}

function sieveOfEratosthenes (limit:Num) : boolean[] {
    assertRange(isInt(limit) && limit >= 2, 'Expect an integer greater than 1')

    const l = Number(limit)
    const sieve = new Array(l)
    for (let i = 0; i < l; i += 2) sieve[i] = false
    if (l > 1) sieve[1] = false
    if (l > 2) sieve[2] = true
    for (let i = 3; i < l; i += 2) sieve[i] = true

    const maxOdd = l - 1 - (l % 2)
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

function primes <
    T extends Num,
    R extends T extends number ? number[] : bigint[],
> (limit:T) {
    const sieve = sieveOfEratosthenes(limit)
    const ps:Num[] = []
    let j = (isBigint(limit) ? 0n : 0) as T
    for (let i = 0; i < limit; i++, j++) {
        if (sieve[i]) ps.push(j)
    }
    return ps as R
}

export {
    isPrime,
    sieveOfEratosthenes,
    primes,
}
