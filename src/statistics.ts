import type { Nums } from './interface'
import { isBigint } from './util/check'
import { BigMath } from './util/bigint'

export type Mean<N extends Nums> = N extends number[] ? number : bigint

function arithmeticMean <N extends Nums> (xs:N) : Mean<N> {
    if (xs.length === 0) return 0 as any

    let sum = xs[0] as any
    let len = xs.length as any
    for (let i = 1; i < len; i++) {
        sum += xs[i]
    }
    if (isBigint(sum)) len = BigInt(len)
    return (sum / len) as any
}
const am = arithmeticMean
const mean = arithmeticMean

function geometricMean <N extends Nums> (xs:N) : Mean<N> {
    if (xs.length === 0) return 0 as any

    let prod = xs[0] as any
    let len = xs.length as any
    for (let i = 1; i < len; i++) {
        prod *= xs[i] as any
    }

    return (typeof prod === 'number'
        ? Math.pow(prod, 1 / len)
        : BigMath.pow(prod, 1 / len)) as any
}
const gm = geometricMean

function harmonicMean <N extends Nums> (xs:N) : Mean<N> {
    if (xs.length === 0) return 0 as any

    const ns = xs.map(Number).filter((x) => x !== 0)

    let sum = 1 / ns[0]
    let len = ns.length
    for (let i = 1; i < len; i++) {
        sum[i] += 1 / ns[i]
    }
    const m = len / sum

    return (typeof xs[0] === 'number' ? m : BigInt(Math.floor(m))) as any
}
const hm = harmonicMean

export {
    mean,
    am,
    arithmeticMean,
    gm,
    geometricMean,
    hm,
    harmonicMean,
}
