//---------//
// Imports //
//---------//

import createDataDependentUtility from './data-dependent'
import createRegularUtility from './regular'

//
//------//
// Main //
//------//

const createSupportedDataUtility = definition => {
  const createUtility = definition.typeToDataDependentProps
    ? createDataDependentUtility
    : createRegularUtility

  return createUtility(definition)
}

//
//---------//
// Exports //
//---------//

export default createSupportedDataUtility
