import { getType } from '../helpers'

const typeToEmptyCollectionCreator = getTypeToEmptyCollectionCreator()

export default collection => typeToEmptyCollectionCreator[getType(collection)]()

//
//------------------//
// Helper Functions //
//------------------//

function getTypeToEmptyCollectionCreator() {
  return {
    array: () => [],
    float32Array: () => new Float32Array(),
    float64Array: () => new Float64Array(),
    int16Array: () => new Int16Array(),
    int32Array: () => new Int32Array(),
    int8Array: () => new Int8Array(),
    map: () => new Map(),
    object: () => ({}),
    set: () => new Set(),
    string: () => '',
    uint16Array: () => new Uint16Array(),
    uint32Array: () => new Uint32Array(),
    uint8Array: () => new Uint8Array(),
    uint8ClampedArray: () => new Uint8ClampedArray(),
  }
}
