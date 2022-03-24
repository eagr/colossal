import { isPosInt } from './util/check'

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

export {
    sumOf,
}