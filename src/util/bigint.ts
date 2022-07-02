import type { Num } from '../interface'
import { assert } from './check'

function abs (x:Num) : bigint {
    if (typeof x === 'number') x = Math.floor(x)
    return BigInt(x < 0 ? -x : x);
}

function sign (x:Num) : bigint {
    return x > 0n ? 1n : (x < 0n ? -1n : 0n)
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

function nthrt (x:Num, n:Num) : bigint {
    if (x == 0) return 0n
    const s = sign(x)
    x = abs(x)

    n = max(0n, n)
    if (n === 0n) return 1n

    assert(
        s === 1n || n % 2n > 0,
        `even root of negative is not supported`,
    )

    let xj = x
    let xk = x + 1n
    let n1 = n - 1n
    while (xj < xk) {
        xk = xj
        xj = (xj * n1 + x / (xj ** n1)) / n
    }
    return s * xk
}

function sqrt (x:Num) : bigint {
    return nthrt(x, 2)
}

const frac = new Array(10000)
for (let i = 0; i < frac.length; i++) {
    frac[i] = 1 / i
}

// exponent must be non-negative
function pow (b:Num, e:Num) : bigint {
    if (e < 0) return 0n
    if (frac.indexOf(e) >= 0) return nthrt(b, 1 / (e as number))

    if (typeof b == 'number') b = Math.floor(b)
    if (typeof e == 'number') e = Math.floor(e)
    return BigInt(b) ** BigInt(e)
}

const BigMath = {
    abs,
    sign,
    max,
    min,
    nthrt,
    sqrt,
    pow,
}

export {
    BigMath,
}
