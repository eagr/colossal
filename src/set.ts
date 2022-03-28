import { isNonNegInt, isPosInt } from './util/check'
import { memoize } from './util/memoize'

const fibonacci = (function () {
    const fib = memoize(
        function (n:number) : [number, number] {
            if (n === 0) return [0, 1]
            const p = fib(n >> 1)
            const fst = p[0] * (2 * p[1] - p[0])
            const snd = p[0] * p[0] + p[1] * p[1]
            return n & 1 ? [snd, fst + snd] : [fst, snd]
        }
    )

    return function (n:number) : number {
        if (!isNonNegInt(n)) throw new Error('expect a non-negative integer')
        return fib(n)[0]
    }
})()

const factorial = memoize(
    function (n:number|bigint) : bigint {
        const bn = BigInt(n)
        if (bn <= 1n) return 1n
        return bn * factorial(bn - 1n)
    }
)

/**
 * Calculate the sum of the first `n` positive integers, each to the power of `k`.
 * @param {number} n - the first `n` positive integers
 * @param {number} p - power of the integers, can be either 1, 2, or 3
 */
 function sumOf (n:number, p=1) : number {
    if (!isPosInt(n)) throw new Error('expect first arg to be a positive integer')
    if (p !== 1 && p !== 2 && p !== 3) throw new Error('expect second arg to be either 1, 2, or 3')
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
    fibonacci,
    factorial,
    sumOf,
    sumFibonacci,
}
