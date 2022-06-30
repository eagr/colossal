function isBigint (x:any) : boolean {
    if (typeof x === 'bigint') return true
    try {
        BigInt.prototype.valueOf.call(x)
        return true
    } catch {
        return false
    }
}

function isNonNegBigint (x:any) : boolean {
    return isBigint(x) && x >= 0n
}

function isPosBigint (x:any) : boolean {
    return isBigint(x) && x > 0n
}

function isInt (x:any) : boolean {
    if (isBigint(x)) return true
    return typeof x === 'number'
        && !isNaN(x)
        && Math.floor(x) === x
}

function isNonNegInt (x:any) : boolean {
    return isNonNegBigint(x) || (isInt(x) && x >= 0)
}

function isPosInt (x:any) : boolean {
    return isPosBigint(x) || (isInt(x) && x > 0)
}

function assert (pred:boolean, msg:string) {
    if (!pred) {
        const err = new RangeError(msg)
        console.error(err)
        throw err
    }
}

function assertInt (x:unknown, msg='Expect an integer') {
    assert(isInt(x), msg)
}

function assertNonNegInt (x:unknown, msg='Expect a non-negative integer') {
    assert(isNonNegInt(x), msg)
}

function assertPosInt (x:unknown, msg='Expect a positive integer') {
    assert(isPosInt(x), msg)
}

function isZero (x:unknown) : boolean {
    return x === 0 || x === 0n
}

export {
    isBigint,
    isNonNegBigint,
    isPosBigint,
    isInt,
    isNonNegInt,
    isPosInt,

    assert,
    assertInt,
    assertNonNegInt,
    assertPosInt,

    isZero,
}
