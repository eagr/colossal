function memoize<F extends unknown>(f:F) : F {
    if (typeof f !== 'function') throw new TypeError('Expect a function')

    const cache = new Map()
    const memoized = function (...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)

        const res = f.apply(null, args)
        cache.set(key, res)
        return res
    } as F
    return memoized
}

export {
    memoize,
}
