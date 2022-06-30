import type { Num, IfAnyBigint } from '../interface'
import { isBigint } from './check'

type Args<F> = F extends (...args:infer A) => any ? A : never

/**
 * Boxed function returns bigint if any bigint in args.
 */
export function box <F extends (...xs:Num[]) => Num> (f:F) {
    return function <A extends Args<F>> (...xs:A) {
        const r = f(...xs)

        let hasBigint = false
        for (let i = 0; i < xs.length; i++) {
            if (isBigint(xs[i])) {
                hasBigint = true
                break
            }
        }
        return (hasBigint ? BigInt(r) : Number(r)) as IfAnyBigint<A>
    }
}
