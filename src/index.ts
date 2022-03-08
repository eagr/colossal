import { isInt, isNonNegInt } from './util'

function gcd (x:number, y:number) : number {
    if (!isInt(x) || !isInt(y)) throw new Error(`both numbers should be integers`)
    if (x === 0 && y === 0) throw new Error(`gcd(0, 0) is undefined`)
    if (x === 0) return y
    if (y === 0) return x

    const l = Math.max(x, y)
    let s = Math.min(x, y)
    let r = l % s

    while (r > 0) {
        const rem = s % r
        s = r
        r = rem
    }

    return Math.abs(s)
}

function lcm (x:number, y:number) : number {
    if (!isNonNegInt(x) || !isNonNegInt(y)) throw new Error(`both numbers should be non-negative integers`)
    if (x === 0 || y === 0) return 0
    return x * y / gcd(x, y)
}

export {
    gcd,
    lcm,
}
