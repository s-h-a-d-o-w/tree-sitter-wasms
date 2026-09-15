module Main exposing (main)

import Html exposing (Html, text)


type alias Person =
    { name : String
    , age : Int
    }


greet : Person -> String
greet person =
    "Hello, " ++ person.name ++ "!"


main : Html msg
main =
    text (greet { name = "world", age = 1 })
