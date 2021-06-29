let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.14.2-20210629/packages.dhall sha256:534c490bb73cae75adb5a39871142fd8db5c2d74c90509797a80b8bb0d5c3f7b

let overrides = {=}

let additions =
      { var =
        { dependencies =
          [ "console", "contravariant", "effect", "invariant", "psci-support" ]
        , repo = "https://github.com/zudov/purescript-var"
        , version = "v3.0.0"
        }
      }

in  upstream // overrides // additions
