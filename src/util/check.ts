function isBigInt (x:any) : boolean {
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

function assertRange (pred:boolean, msg:string) {
    if (!pred) {
        const err = new RangeError(msg)
        console.error(err)
        throw err
    }
}

function assertInt (x:any, msg='Expect an integer') {
    assertRange(isInt(x), msg)
}

function assertNonNegInt (x:any, msg='Expect a non-negative integer') {
    assertRange(isNonNegInt(x), msg)
}

function assertPosInt (x:any, msg='Expect a positive integer') {
    assertRange(isPosInt(x), msg)
}

function isZero (x:any) : boolean {
    return x === 0 || x === 0n
}

export {
    isBigInt,
    isNonNegBigInt,
    isPosBigInt,
    isInt,
    isNonNegInt,
    isPosInt,

    assertRange,
    assertInt,
    assertNonNegInt,
    assertPosInt,

    isZero,
}
