//
// README
// - flattens a single level
//

import reduce from '../internal/reduce_array-like'

export default {
  name: 'flatten',
  typeToFunction: { array },
}

//
//------------------//
// Helper Functions //
//------------------//

function array(anArray) {
  return reduce((result, element) => {
    if (Array.isArray(element)) Array.prototype.push.apply(result, element)
    else result.push(element)

    return result
  }, [])(anArray)
}
