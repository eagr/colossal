import type { Num, IfAnyBigint } from '../interface'
import { isBigint } from './check'

type Args<F> = F extends (...args:infer A) => any ? A : never

/**
 * Box a function so that the boxed version only returns bigint if there is at least one bigint
 * in the arguments.
 */
export function box <F extends (...xs:Num[]) => bigint> (f:F) {
    return function <A extends Args<F>> (...xs:A) {
        const r = f(...xs)

        let hasBigint = false
        for (let i = 0; i < xs.length; i++) {
            if (isBigint(xs[i])) {
                hasBigint = true
                break
            }
        }
        return (hasBigint ? r : Number(r)) as IfAnyBigint<A>
    }
}
