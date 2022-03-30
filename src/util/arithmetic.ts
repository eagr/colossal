import { isInt, isZero } from './check'
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

    const areNumbers = typeof x === 'number' && typeof y === 'number'
    let bx = BigMath.abs(x)
    let by = BigMath.abs(y)
    if (bx === 0n && by === 0n) throw new Error('gcd(0, 0) is undefined')

    while (true) {
        if (bx === 0n) return (areNumbers ? Number(by) : by) as T
        by %= bx
        if (by === 0n) return (areNumbers ? Number(bx) : bx) as T
        bx %= by
    }
}

function lcm<T extends Num> (x:T, y:T) : T {
    const areNumbers = typeof x === 'number' && typeof y === 'number'
    if (isZero(x) && isZero(y)) return (areNumbers ? 0 : 0n) as T

    const bx = BigMath.abs(x)
    const by = BigMath.abs(y)
    const m = bx * by / gcd(bx, by)
    return (areNumbers ? Number(m) : m) as T
}

export {
    powMod,
    gcd,
    lcm,
}
