import type { Num } from './interface'
import { assertPosInt, assertNonNegInt, assertRange } from './util/check'
import { box } from './util/box'
import { memoize } from './util/memoize'

const triangular = box(function (n:Num) : bigint {
    assertPosInt(n)
    const bn = BigInt(n)
    return (1n + bn) * bn / 2n
})

const fibonacci = box((function () {
    const fib = memoize(
        function (n:bigint) : [bigint, bigint] {
            if (n === 0n) return [0n, 1n]
            const p = fib(n / 2n)
            const fst = p[0] * (2n * p[1] - p[0])
            const snd = p[0] * p[0] + p[1] * p[1]
            return n % 2n === 1n ? [snd, fst + snd] : [fst, snd]
        }
    )

    return function (n:Num) : bigint {
        assertNonNegInt(n)
        return fib(BigInt(n))[0]
    }
})())

const factorial = box((function () {
    const f = memoize(
        function (n:bigint) : bigint {
            if (n <= 1n) return 1n
            return n * f(n - 1n)
        }
    )

    return function (n:Num) : bigint {
        assertNonNegInt(n)
        return f(BigInt(n))
    }
})())

/**
 * Calculate the sum of the first `n` positive integers, each to the power of `p`.
 * @param {number} n - the first n positive integers
 * @param {number} p - power of the integers, can be either 1, 2, or 3
 */
const sumOf = box(function (n:Num, p:Num=1n) : bigint {
    const bn = BigInt(n)
    const bp = BigInt(p)
    assertRange(bp === 1n || bp === 2n || bp === 3n, 'Expect exponent to be either 1, 2, or 3')
    assertPosInt(n, 'Expect `n` to be a positive integer')

    if (bp === 1n) return bn * (1n + bn) / 2n
    if (bp === 2n) return bn * (bn + 1n) * (2n * bn + 1n) / 6n
    return bn * bn * (bn + 1n) * (bn + 1n) / 4n
})

/**
 * F(n)     = F(n+2) - F(n+1)
 * F(n-1)   = F(n+1) - F(n)
 * ...
 * F(1)     = F(3) - F(2)
 * F(0)     = F(2) - F(1)
 *
 * S(n) = F(n) + F(n-1) + ... + F(1) + F(0)
 *      = F(n+2) - F(1)
 */
const sumFibonacci = box(function (n:Num) : bigint {
    return fibonacci(BigInt(n) + 2n) - fibonacci(1n)
})

export {
    triangular,
    fibonacci,
    factorial,
    sumOf,
    sumFibonacci,
}
