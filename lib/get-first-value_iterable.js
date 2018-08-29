export default iterable => iterable[Symbol.iterator]().next().value
