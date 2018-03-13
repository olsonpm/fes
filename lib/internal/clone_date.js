import copyOwnEnumerableProps from './copy-own-enumerable-props'

export default aDate => copyOwnEnumerableProps(aDate, new Date(aDate.getTime()))
