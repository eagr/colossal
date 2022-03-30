import { assertPosInt, assertNonNegInt, assertRange } from './util/check'
import { memoize } from './util/memoize'

function triangular (n:number) : number {
    assertPosInt(n)
    return (1 + n) * n / 2
}

const fibonacci = (function () {
    const fib = memoize(
        function (n:number) : [number, number] {
            if (n === 0) return [0, 1]
            const p = fib(Math.floor(n / 2))
            const fst = p[0] * (2 * p[1] - p[0])
            const snd = p[0] * p[0] + p[1] * p[1]
            return n % 2 === 1 ? [snd, fst + snd] : [fst, snd]
        }
    )

    return function (n:number) : number {
        assertNonNegInt(n)
        return fib(n)[0]
    }
})()

const factorial = (function () {
    const f = memoize(
        function (n:number|bigint) : bigint {
            const bn = BigInt(n)
            if (bn <= 1n) return 1n
            return bn * f(bn - 1n)
        }
    )

    return function (n:number|bigint) : bigint {
        assertNonNegInt(n)
        return f(n)
    }
})

/**
 * Calculate the sum of the first `n` positive integers, each to the power of `p`.
 * @param {number} n - the first n positive integers
 * @param {number} p - power of the integers, can be either 1, 2, or 3
 */
 function sumOf (n:number, p=1) : number {
    assertRange(p === 1 || p === 2 || p === 3, 'Expect exponent to be either 1, 2, or 3')
    assertPosInt(n, 'Expect `n` to be a positive integer')
    if (p === 1) return n * (1 + n) / 2
    if (p === 2) return n * (n + 1) * (2 * n + 1) / 6
    return n * n * (n + 1) * (n + 1) / 4
}

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
function sumFibonacci (n:number) : number {
    return fibonacci(n + 2) - fibonacci(1)
}

export {
    triangular,
    fibonacci,
    factorial,
    sumOf,
    sumFibonacci,
}
