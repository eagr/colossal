export type Num = number | bigint

export type Tuple<
    E extends unknown,
    N extends number,
    T extends unknown[] = []
> = T['length'] extends N ? T : Tuple<E, N, [E, ...T]>

export type Params<N extends number> = Tuple<Num, N>

export type IfAnyBigint<L extends Num[]> = L extends number[] ? number : bigint
export type IfAny<L extends U[], U, T extends U, O = Exclude<U, T>> = L extends O[] ? O : T;
