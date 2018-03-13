//
// README
//   - Currently I just want cloneDeep to take in arguments which can actually
//     be cloned deeply.  In the future I may change my mind to allow any type
//     or maybe just those which are clone'able.  Gotta figure out what makes
//     sense as I come across use-cases.
//

import cloneDeep from 'clone-deep'

export default {
  name: 'cloneDeep',
  typeToFunction: {
    arguments: cloneDeep,
    array: cloneDeep,
    object: cloneDeep,
    map: cloneDeep,
    set: cloneDeep,
  },
}
