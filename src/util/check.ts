function isInt (x:any) : boolean {
    return typeof x === 'number'
        && !isNaN(x)
        && (x | 0) === x
}

function isNonNegInt (x:any) : boolean {
    return isInt(x) && x >= 0
}

function isPosInt (x:any) : boolean {
    return isInt(x) && x > 0
}

export {
    isInt,
    isNonNegInt,
    isPosInt,
}
