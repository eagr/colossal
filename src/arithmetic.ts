import type { Num, IfAnyBigint } from './interface'
import { isInt, isPosInt, isZero } from './util/check'
import { BigMath } from './util/bigint'

function powMod <
    B extends Num,
    P extends Num,
    M extends Num,
    R extends IfAnyBigint<[B, P, M]>,
> (b:B, p:P, m:M) : R {
    if (!isPosInt(b) || !isPosInt(p) || !isPosInt(m)) throw new RangeError('Expect positive integers')

    const areNums = typeof b === 'number' && typeof p === 'number' && typeof m === 'number'
    let bb = BigInt(b)
    let bp = BigInt(p)
    let bm = BigInt(m)

    bb %= bm
    let res = 1n
    while (bp > 0n) {
        if (bp % 2n === 1n) res = res * bb % bm
        bb = bb * bb % bm
        bp = bp / 2n
    }
    return (areNums ? Number(res) : res) as R
}

function gcd <
    X extends Num,
    Y extends Num,
    R extends IfAnyBigint<[X, Y]>,
> (x:X, y:Y) : R {
    if (!isInt(x) || !isInt(y)) throw new RangeError('Expect integers')

    const areNums = typeof x === 'number' && typeof y === 'number'
    let bx = BigMath.abs(x)
    let by = BigMath.abs(y)
    if (bx === 0n && by === 0n) throw new RangeError('GCD(0, 0) is undefined')

    while (true) {
        if (bx === 0n) return (areNums ? Number(by) : by) as R
        by %= bx
        if (by === 0n) return (areNums ? Number(bx) : bx) as R
        bx %= by
    }
}

function lcm <
    X extends Num,
    Y extends Num,
    R extends IfAnyBigint<[X, Y]>,
> (x:X, y:Y) : R {
    const areNums = typeof x === 'number' && typeof y === 'number'
    if (isZero(x) && isZero(y)) return (areNums ? 0 : 0n) as R

    const bx = BigMath.abs(x)
    const by = BigMath.abs(y)
    const m = bx * by / gcd(bx, by)
    return (areNums ? Number(m) : m) as R
}

export {
    powMod,
    gcd,
    lcm,
}
