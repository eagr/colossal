import { isInt } from './check'

function abs (x:bigint|number) : bigint {
    if (!isInt(x)) throw new Error('expect an integer')
    return BigInt(x < 0 ? -x : x)
}

function sign (x:bigint|number) : bigint {
    if (!isInt(x)) throw new Error('expect an integer')
    return x > 0n ? 1n : (x < 0n ? -1n : 0n)
}

function pow (b:bigint|number, e:bigint|number) : bigint {
    if (!isInt(b) || !isInt(e)) throw new Error('expect integers')
    return BigInt(b) ** BigInt(e)
}

function max (x:bigint|number, ...xs:(bigint|number)[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] > m) m = xs[i]
    }
    return BigInt(m)
}

function min (x:bigint|number, ...xs:(bigint|number)[]) : bigint {
    let m = x
    for (let i = 0; i < xs.length; i++) {
        if (xs[i] < m) m = xs[i]
    }
    return BigInt(m)
}

function sqrt (x:bigint|number) : bigint {
    if (!isInt(x)) throw new Error('expect an integer')

    const b = BigInt(x)
    if (b < 0n) throw new Error('sqrt of negative is not supported')
    if (b < 2n) return b

    function newton (n:bigint, guess:bigint) : bigint {
        const quot = n / guess
        if (abs(quot - guess) <= 1) return guess
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
