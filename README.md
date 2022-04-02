# colossal

bigint-friendly arithmetic toolkit

## Contract

* Each function can take a mix of `number` and `bigint` as arguments.
* If any of the arguments is a `bigint`, the function may return
  * either a `bigint`
  * or a collection of `bigint`s
* If none of the arguments are `bigint`s, the function may return
  * either a `number`
  * or a collection of `number`s

## License

[MIT](./LICENSE)
