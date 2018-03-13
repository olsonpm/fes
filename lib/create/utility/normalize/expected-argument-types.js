import { map_arrayLike as map } from '../../../internal'

export default function normalizeExpectedArgumentTypes(expectedArgumentTypes) {
  return map(oneOrManyTypes => {
    oneOrManyTypes = Array.isArray(oneOrManyTypes)
      ? oneOrManyTypes
      : [oneOrManyTypes]

    return new Set(oneOrManyTypes)
  })(expectedArgumentTypes)
}
