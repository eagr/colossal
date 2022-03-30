const supportsBigInt = typeof BigInt === 'function' && typeof BigInt(0) === 'bigint'

if (!supportsBigInt) {
    const err = new Error('BigInt support is required. Try upgrading your environment.')
    console.error(err)
    throw err
}

export * from './arithmetic'
export * from './primality'
export * from './sole'
export * from './dual'
export * from './set'
