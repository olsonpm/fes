## definition schema

### common

#### name
- type: string
- description: utility name

#### expectedServiceArgumentTypes
- type: array of (string | array of string)
- description: convenience property indicating all functions listed in
  'typeToFunction' must be given service arguments of the specified type(s).
  e.g. `['string', ['object', 'map']]` means all functions take two service
  arguments.  The first argument must be a string type and the second argument
  must be an object or map type.  See [type](#type) below for details on what
  exactly a 'type' is in this library

#### typeToFunction
- type: object of functions
- description: convenience property generally used alongside
  'expectedServiceArgumentTypes'.  The key is the [type](#type) of the data
  argument passed

#### typeToDataDependentProps
- type: objects with the shape
```js
{
  <data argument type>: {
    expectedServiceArgumentTypes: <array of types>
    transformServiceArguments: <array or object of functions>
    theFunction (required): <function>
  }
  <data argument type>: ...
}
```
- description: a more verbose declaration that should be used when the functions
  have data-dependent properties.  The only current supported data-dependent
  properties are `expectedServiceArgumentTypes` and `transformServiceArguments`.
  Example utilities which utilize this are `something` and `another`.
- note: This property can't be declared alongside `typeToFunction`

<br>

### not common

#### flippedFrom
- type: definition
- description: convenience property to indicate the data and service arguments
  are flipped.  e.g. contains <--> containedIn

#### hasNoDataArgument
- type: object with keys 'expectedArgumentTypes', 'theFunction', and optionally
  'shouldThrowOnExtraArguments (defaults to true)'
- description: some utilities don't have different functionality per type e.g.
  `alwaysReturn` and `passThrough`.  Eventually these may be ported to a
  separate utility library, but for now this is the method for declaring them

#### transformServiceArguments
- type: array or object of functions (where an object would have the argument
  indices as keys which are implicit with arrays.  This is more readable if you
  only want to transform the second argument e.g. `reduceFresh`.)
- description: this allows a utility to modify the incoming arguments.  One
  example of this is `containsAll` which takes either an array or a set but then
  coerces it into a set.  This allows consumers to avoid the verbosity of
  declaring a `new Set([...])`.

#### transformResult
- type: function
- description: allows a utility to take the result of all functions and
  transform it.

#### mergeDefinitionWith
- type: definition
- description: uses 'assignOverRecursively' to merge the current definition over
  the one being 'merged with'.  This is helpful when you want to share all but
  a few properties.

#### approveArguments
- type: function
- description: this function should have the same signature as the utility and
  approve the arguments accordingly.  Remember this library assumes 'approve'
  means 'return an error if invalid'
- note: 'approveArguments' causes some complexity in the code because it may
  return one of three values for functions with both service and data arguments.
    *given a typical signature `utility(...serviceArgs)(dataArg)`*
    1. the first function call will return either a function or an error
    2. the second call will return either undefined or an error
  Remember utilities can be flipped, made unary, not have data arguments, etc.
  All those cases mean 'approveArguments' turns out to be complex, and to avoid
  some of it I chose to run the first approve call twice i.e. in a typical
  utility such as above, serviceArgs will be validated twice.

  An alternative and simpler approach would be to have three
  definition properties
    - approveServiceArguments
    - approveDataArgument
    - approveAllArguments
  but this seems like an unnecessarily complex API for utility authors.  It
  seems much more intuitive to have one 'approveArguments' property that takes
  the same function signature and returns an error when it receives
  invalid arguments.

  Maybe I'll think of a better approach down the road, or deal with the
  complexity to avoid the serviceArgs being called twice because, although it
  shouldn't cause problems, is potentially problematic should some crazy
  side-effect approval code make its way into a utility! :)

#### isArrayOfData
- type: boolean (defaults to false)
- description: declares a utility whose data argument is actually an array of
  the data being held.  Because an empty array leaves the data type ambiguous,
  utilities declaring this property will be built as an object exposing plural
  data types e.g. `combineAll.objects(arrayOfObjects)`.  Utilities with this
  flag also first validate the input to make sure each element in the array is
  the expected object type.
- note: I need to use this property some more before I feel confident in its
  api.  Right now it feels very brittle.

#### isAsynchronous
- type: boolean (defaults to false)
- description: currently unused but I know it will be useful when I decide to
  add asynchronous utilities.  I added knowledge of this to the code because I
  didn't want to have to refactor a lot of error handling in the future.

<br>

### reference

#### type
- Types are used for both validating arguments as well as determining the proper
  function to use within a utility (e.g. [typeToFunction](#typetofunction))

- A 'type' may be one of the following:
  - the result of a `firstCharacterToLowerCase(typeDetect(something))`
    where [`typeDetect` is from chai](https://github.com/chaijs/type-detect)
  - a group which encompasses multiple types (see the list below).  Groups are
    currently only used in [typeToFunction](#typetofunction)
  - 'any'.  When used in [typeToFunction](#typetofunction) this is a fall-back
    used if none of the other types matched the data argument.  When used in
    [expectedServiceArgumentTypes](#expectedserviceargumenttypes) this tells the
    utility to not type check an argument.  Note we still need to declare 'any'
    because the number of arguments expected is derived from that array.

- All groups currently used  
  - allArrays: 'array' as well as typedArrays
  - typedArrays: e.g. Int16Array
  - arrayLike: string, arguments, allArrays
  - mapOrSet: map or set
