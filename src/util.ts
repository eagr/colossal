function isInt (x:any) : boolean {
    return typeof x === 'number'
        && !isNaN(x)
        && (x | 0) === x
}

export {
    isInt,
}
