import type { Num } from './interface'
import { assertRange, isInt, isBigint, isZero } from './util/check'
import { BigMath } from './util/bigint'

function isPrime (x:Num) : boolean {
    if (!isInt(x)) return false

    const bx = BigInt(x)
    if (bx <= 3n) return bx > 1n
    if (bx % 2n === 0n || bx % 3n === 0n) return false

    const hi = BigMath.sqrt(bx)
    for (let i = 5n; i <= hi; i += 6n) {
        if (bx % i === 0n || bx % (i + 2n) === 0n) return false
    }
    return true
}

let _sieve:boolean[] = []
function sieveOfEratosthenes (limit:Num) : boolean[] {
    assertRange(isInt(limit) && limit >= 2, 'Expect an integer greater than 1')
    const l = Number(limit)
    if (l < _sieve.length) return _sieve.slice(0, Number(l))

    _sieve = new Array(l)
    for (let i = 0; i < l; i += 2) _sieve[i] = false
    if (l > 1) _sieve[1] = false
    if (l > 2) _sieve[2] = true
    for (let i = 3; i < l; i += 2) _sieve[i] = true

    const maxOdd = l - 1 - (l % 2)
    const cross = Math.floor(Math.sqrt(maxOdd))

    for (let i = 3; i <= cross; i += 2) {
        if (_sieve[i]) {
            for (let j = i * i; j <= maxOdd; j += i) {
                _sieve[j] = false
            }
        }
    }
    return _sieve.slice(0)
}

const sieve = sieveOfEratosthenes

function primes <N extends Num> (limit:N) {
    const sv = sieve(limit)
    const ps:Num[] = []
    let j = isBigint(limit) ? 0n : 0
    for (let i = 0; i < limit; i++, j++) {
        if (sv[i]) ps.push(j)
    }
    return ps as N extends number ? number[] : bigint[]
}

function factors <N extends Num> (n:N) {
    assertRange(!isZero(n), 'Expect non-zero integers')

    const big = isBigint(n)
    const fs = new Set([big ? 1n : 1])

    const bn = BigMath.abs(n)
    let div = bn
    const ps = primes(BigMath.sqrt(bn) + 1n)

    for (let i = 0; i < ps.length && div > ps[i]; i++) {
        const p = ps[i]
        let f = 1n
        while (div % p === 0n) {
            div /= p
            f *= p
            big ? fs.add(f).add(bn / f) : fs.add(Number(f)).add(Number(bn / f))
        }
    }
    if (div > 1n) fs.add(big ? div : Number(div))
    if (div !== bn) fs.add(big ? bn : Number(bn))

    return (
        Array.from(fs).sort((a:any, b:any) => Number(a - b))
    ) as N extends number ? number[] : bigint[]
}

export {
    isPrime,
    sieve,
    primes,
    factors,
}
