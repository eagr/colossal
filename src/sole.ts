import { isPosInt } from './util'
import { sieveOfEratosthenes } from './primality'

function numDivisors (x:number) : number {
    if (!isPosInt(x)) throw new Error('expect a positive integer')
    if (x === 1) return 1

    const sieve = sieveOfEratosthenes(Math.floor(Math.sqrt(x)) + 1)
    const exps:number[] = []

    let div = x
    let prev = div
    while (div > 1) {
        for (let i = 0; i < sieve.length; i++) {
            if (sieve[i]) {
                let e = 1
                while (div % i === 0) {
                    div /= i
                    e++
                }
                if (e > 1) exps.push(e)
            }
        }

        if (div === prev) break
        prev = div
    }
    if (div > 1) exps.push(2)

    let num = 1
    for (let i = 0; i < exps.length; i++) {
        num *= exps[i]
    }
    return num
}

export {
    numDivisors,
}
