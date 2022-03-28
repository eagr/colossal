function powMod (b:number, p:number, m:number) : number {
    b %= m
    let res = 1
    while (p > 0) {
        if (p % 2 === 1) res = res * b % m
        b = b * b % m
        p = Math.floor(p / 2)
    }
    return res
}

export {
    powMod,
}
