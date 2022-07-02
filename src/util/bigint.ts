import type { Num } from '../interface'

/**
 * `Math` functions that work for bigint,
 * only throw for `Infinity`, `-Infinity`, and `NaN`
 */

function abs (x:Num) : bigint {
    if (typeof x === 'number') x = Math.floor(x)
    return BigInt(x < 0 ? -x : x);
}

function sign (x:Num) : bigint {
    return x > 0n ? 1n : (x < 0n ? -1n : 0n)
}

// exponent must be non-negative
function pow (b:Num, e:Num) : bigint {
    if (e < 0) return 0n

    if (typeof b == 'number') b = Math.floor(b)
    if (typeof e == 'number') e = Math.floor(e)
    return BigInt(b) ** BigInt(e)
}

function max (x:Num, ...xs:Num[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] > m) m = xs[i]
    }
    if (typeof m === 'number') m = Math.floor(m)
    return BigInt(m)
}

function min (x:Num, ...xs:Num[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] < m) m = xs[i]
    }
    if (typeof m === 'number') m = Math.floor(m)
    return BigInt(m)
}

function sqrt (x:Num) : bigint {
    if (typeof x === 'number') x = Math.floor(x)
    const b = max(BigInt(x), 0n)
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
