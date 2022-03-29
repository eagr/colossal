import { isNonNegInt } from './util/check'
import { gcd } from './util/arithmetic'

function lcm (x:number, y:number) : number {
    if (!isNonNegInt(x) || !isNonNegInt(y)) throw new Error('expect non-negative integers')
    if (x === 0 || y === 0) return 0
    return x * y / gcd(x, y)
}

export {
    gcd,
    lcm,
}
