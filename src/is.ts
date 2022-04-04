import type { Num } from './interface'
import { assertNonNegInt } from './util/check'
import { BigMath } from './util/bigint'
import { isPrime } from './_'

function isSquare (n:Num) : boolean {
    assertNonNegInt(n)
    const sqrt = BigMath.sqrt(n)
    return BigInt(n) === sqrt * sqrt
}

export {
    isPrime,
    isSquare,
}
