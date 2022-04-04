import type { Num } from './interface'
import { box } from './util/box'
import { isPosInt } from './util/check'

const powMod = box(function (b:Num, p:Num, m:Num) : bigint {
    if (!isPosInt(b) || !isPosInt(p) || !isPosInt(m)) throw new RangeError('Expect positive integers')

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
    return res
})

export {
    powMod,
}
