{
    "root": true,
    "extends": "airbnb-base",
    "env": {
        "node": true,
        "es6": true,
        "jasmine": true,
        "browser": true
    },
    "plugins": [
      "react",
      "jsx-a11y",
      "import",
      "jsx"
    ],
    "rules": {
        "max-len": [2, 80, 2],
        "indent": [2, 2],
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "curly": [2, "multi-line"],
        "no-shadow": [2, { "allow": ["req", "res", "err"] }],
        "valid-jsdoc": [2, {
            "requireReturn": true,
            "requireReturnType": true,
            "requireParamDescription": false,
            "requireReturnDescription": true
        }],
        "require-jsdoc": [2, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true
            }
        }]
    }
}

