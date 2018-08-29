#! /usr/bin/env sh

command="${1}"
shift

printUsage() {
  printf "./run <command>\\n\\n"
  echo   "where <command> is one of:"
  echo   "  lint"
  printf "  test\\n\\n"
}

case "${command}" in
  test)
    ./node_modules/.bin/mocha --require 'esm' --ui tdd "$@" -- "tests/index.js" ;;

  lint)
    ./node_modules/.bin/eslint create-utility lib tests index.js ;;

  '')
    printf "'run' requires a command\\n\\n"
    printUsage ;;

  *)
    printf "command '%s' not valid\\n\\n" "${command}"
    printUsage ;;
esac
