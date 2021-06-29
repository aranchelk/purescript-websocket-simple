{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "websocket-simple"
, dependencies =
  [ "console"
  , "debug"
  , "effect"
  , "exceptions"
  , "foreign"
  , "nullable"
  , "psci-support"
  , "unsafe-coerce"
  , "var"
  , "web-socket"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
