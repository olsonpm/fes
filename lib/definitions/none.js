import any from './any'

export default {
  name: 'none',
  mergeDefinitionWith: any,
  transformResult: result => !result,
}
