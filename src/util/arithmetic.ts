import { isInt } from './check'
import { BigMath } from './bigint'

type Num = number | bigint

function powMod (b:number, p:number, m:number) : number {
    b %= m
    let res = 1
    while (p > 0) {
        if (p % 2 === 1) res = res * b % m
        b = b * b % m
        p = Math.floor(p / 2)
    }
    return res
}

function gcd<T extends Num> (x:T, y:T) : T {
    if (!isInt(x) || !isInt(y)) throw new Error('expect integers')

    const isNumber = typeof x === 'number' && typeof y === 'number'
    const bx = BigMath.abs(x)
    const by = BigMath.abs(y)
    if (bx === 0n && by === 0n) throw new Error('gcd(0, 0) is undefined')
    if (bx === 0n) return (isNumber ? Number(by) : by) as T
    if (by === 0n) return (isNumber ? Number(bx) : bx) as T

    let l = BigMath.max(bx, by)
    let s = BigMath.min(bx, by)
    let r = l % s

    while (r > 0n) {
        const rem = s % r
        s = r
        r = rem
    }
    return (isNumber ? Number(s) : s) as T
}

export {
    powMod,
    gcd,
}
