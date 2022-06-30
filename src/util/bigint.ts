/**
 * Each function in the module takes integers as input, either `number` or `bigint`,
 * and always returns a `bigint`.
 */

import type { Num } from '../interface'
import { assertInt, assertNonNegInt } from './check'

function abs (x:Num) : bigint {
    assertInt(x)
    return BigInt(x < 0 ? -x : x)
}

function sign (x:Num) : bigint {
    assertInt(x)
    return x > 0n ? 1n : (x < 0n ? -1n : 0n)
}

function pow (b:Num, e:Num) : bigint {
    assertNonNegInt(e, 'Exponent must not be negative')
    assertInt(b, 'Expect integers')
    return BigInt(b) ** BigInt(e)
}

function max (x:Num, ...xs:(Num)[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] > m) m = xs[i]
    }
    return BigInt(m)
}

function min (x:Num, ...xs:(Num)[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] < m) m = xs[i]
    }
    return BigInt(m)
}

function sqrt (x:Num) : bigint {
    const b = BigInt(x)
    assertNonNegInt(b, 'sqrt of negative is not supported')
    if (b < 2n) return b

    function newton (n:bigint, guess:bigint) : bigint {
        const quot = n / guess
        if (abs(quot - guess) <= 1) {
            return quot >= guess ? guess : guess - 1n
        }
        return newton(n, (quot + guess) / 2n)
    }

    return newton(b, 1n)
}

const BigMath = {
    abs,
    sign,
    pow,
    max,
    min,
    sqrt,
}

export {
    BigMath,
}
