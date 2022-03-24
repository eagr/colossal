function isBigInt (x:any) : boolean {
    if (typeof BigInt !== 'function') return false
    if (typeof x === 'bigint') return true

    return (function () {
        try {
            BigInt.prototype.valueOf.call(x)
            return true
        } catch (_) {
            return false
        }
    })()
}

function isNonNegBigInt (x:any) : boolean {
    return isBigInt(x) && x >= 0n
}

function isPosBigInt (x:any) : boolean {
    return isPosBigInt(x) && x > 0n
}

function isInt (x:any) : boolean {
    if (isBigInt(x)) return true
    return typeof x === 'number'
        && !isNaN(x)
        && (x | 0) === x
}

function isNonNegInt (x:any) : boolean {
    return isNonNegBigInt(x) || (isInt(x) && x >= 0)
}

function isPosInt (x:any) : boolean {
    return isPosBigInt(x) || (isInt(x) && x > 0)
}

export {
    isInt,
    isNonNegInt,
    isPosInt,

    isBigInt,
    isNonNegBigInt,
    isPosBigInt,
}
