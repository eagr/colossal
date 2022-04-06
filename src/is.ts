import type { Num } from './interface'
import { isNonNegInt, isPosInt } from './util/check'
import { BigMath } from './util/bigint'
import { isPrime, factors } from './_'

function isPerfect (x:Num) : boolean {
    if (!isPosInt(x)) return false

    const bx = BigInt(x)
    const fs = factors(bx)
    let sum = 0n
    for (let i = 0; i < fs.length - 1; i++) {
        sum += fs[i]
    }
    return sum === bx
}

function isSquare (x:Num) : boolean {
    if (!isNonNegInt(x)) return false
    const sqrt = BigMath.sqrt(x)
    return BigInt(x) === sqrt * sqrt
}

export {
    isPerfect,
    isPrime,
    isSquare,
}
