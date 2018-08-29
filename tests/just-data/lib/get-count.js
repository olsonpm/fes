import { getValueAt } from '../../../lib'

export default {
  name: 'getCount',
  typeToFunction: {
    array: getValueAt('length'),
  },
  groupToFunction: {
    mapOrSet: getValueAt('size'),
  },
}
