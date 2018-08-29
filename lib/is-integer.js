//
// from here:
// https://stackoverflow.com/a/14794066/984407
//

export default value =>
  !isNaN(value) &&
  parseInt(Number(value)) == value &&
  !isNaN(parseInt(value, 10))
