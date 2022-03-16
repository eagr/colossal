import { isPosInt } from './util'
import { primesUpTo } from './primality'

function digitSum (x:number) : number {
    if (!isPosInt(x)) throw new Error('expect a positive integer')

    let sum = 0
    while (x > 0) {
        sum += x % 10
        x = Math.floor(x / 10)
    }
    return sum
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
    digitSum,
    numDivisors,
}
