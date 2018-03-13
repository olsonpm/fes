#! /usr/bin/env sh

command="${1}"
shift

printUsage() {
  printf "./run <command>\\n\\n"
  echo   "where <command> is one of:"
  echo   "  lint"
  echo   "  test"
  echo   "  watch-lib"
  printf "  write-entry\\n\\n"
}

writeEntry() {
  node ./build/write-entry/run
}

case "${command}" in
  test)
    writeEntry
    npx mocha --require 'esm' --ui tdd "$@" -- tests/public ;;

  lint)
    npx eslint lib build tests ;;

  watch-lib)
    node ./build/watch-lib/run ;;

  write-entry)
    writeEntry ;;

  '')
    printf "'run' requires a command\\n\\n"
    printUsage ;;

  *)
    printf "command '%s' not valid\\n\\n" "${command}"
    printUsage ;;
esac
