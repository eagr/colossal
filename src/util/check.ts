const supportsBigInt = typeof BigInt === 'function' && typeof BigInt(0) === 'bigint'

function isBigInt (x:any) : boolean {
    if (!supportsBigInt) return false
    if (typeof x === 'bigint') return true
    try {
        BigInt.prototype.valueOf.call(x)
        return true
    } catch {
        return false
    }
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
        && Math.floor(x) === x
}

function isNonNegInt (x:any) : boolean {
    return isNonNegBigInt(x) || (isInt(x) && x >= 0)
}

function isPosInt (x:any) : boolean {
    return isPosBigInt(x) || (isInt(x) && x > 0)
}

function isZero (x:any) : boolean {
    return x === 0 || x === 0n
}

export {
    supportsBigInt,
    isBigInt,
    isNonNegBigInt,
    isPosBigInt,

    isInt,
    isNonNegInt,
    isPosInt,

    isZero,
}
