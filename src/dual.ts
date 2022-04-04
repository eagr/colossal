import type { Num } from './interface'
import { box } from './util/box'
import { BigMath } from './util/bigint'
import { isInt, isZero } from './util/check'

const gcd = box(function (x:Num, y:Num) : bigint {
    if (isZero(x) && isZero(y)) throw new Error('GCD(0, 0) is undefined')
    if (!isInt(x) || !isInt(y)) throw new RangeError('Expect integers')

    let bx = BigMath.abs(x)
    let by = BigMath.abs(y)
    while (true) {
        if (bx === 0n) return by
        by %= bx
        if (by === 0n) return bx
        bx %= by
    }
})

const lcm = box(function (x:Num, y:Num) : bigint {
    if (isZero(x) && isZero(y)) return 0n
    const bx = BigMath.abs(x)
    const by = BigMath.abs(y)
    return bx * by / gcd(bx, by)
})

export {
    gcd,
    lcm,
}
