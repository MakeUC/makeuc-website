module.exports = {
  extends: ["next/core-web-vitals"],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    // Built-in Fixable Rules
    "arrow-parens": ["warn", "as-needed"],
    "comma-dangle": ["warn", "always-multiline"],
    "linebreak-style": ["warn", "unix"],
    "jsx-quotes": ["warn", "prefer-double"],
    "no-console": "warn",
    "no-multi-spaces": ["off"],
    "object-curly-spacing": ["warn", "always", { objectsInObjects: true, arraysInObjects: true }],
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],

    // Built-in Unfixable Rules
    "max-len": ["error", { code: 120, ignoreStrings: true, ignoreComments: true, ignoreTemplateLiterals: true }],
    "no-tabs": "error",

    // Import Rules
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/first": "warn",
    "import/newline-after-import": ["warn", { count: 2 }],
    "import/no-absolute-path": "warn",
    "import/no-duplicates": "warn",
    "import/no-mutable-exports": "error",
    "import/no-unresolved": "error",
    "import/no-useless-path-segments": "warn",
    "import/order": ["warn", {
      "alphabetize": { order: "asc", orderImportKind: "asc", caseInsensitive: true },
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      "newlines-between": "always",
    }],

    // Typescript Settings
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
    "@typescript-eslint/consistent-type-exports": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",
    "indent": "off",
    "@typescript-eslint/indent": ["warn", 2, {
      SwitchCase: 1,
      ignoredNodes: [
        "CallExpression > TSTypeParameterInstantiation.typeParameters",
        "TSTypeReference > TSTypeParameterInstantiation.typeParameters",
        "TSUnionType",
      ],
    }],
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "warn",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/triple-slash-reference": "warn",

    // React Rules
    "react/function-component-definition": ["warn", { namedComponents: "function-declaration", unnamedComponents: "arrow-function" }],
    "react/jsx-closing-bracket-location": "warn",
    "react/jsx-key": "error",
  },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  overrides: [
    {
      // Disable typescript specific rules (when required)
      files: ["./**/*.js", "./**/*.cjs"],
      rules: {
        // Enable regular ESLint rules to counteract the disabled typescript eslint rules.
        "indent": ["warn", 2],
        "no-array-constructor": "warn",
        "no-empty-function": "warn",
        "no-extra-semi": "warn",
        "no-loss-of-precision": "warn",
        "no-unused-vars": "warn",

        // Disable typescript rules
        "@typescript-eslint/adjacent-overload-signatures": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-array-constructor": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-non-null-assertion": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-loss-of-precision": "off",
        "@typescript-eslint/no-misused-new": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unnecessary-type-constraint": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-as-const": "off",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use <root>/path/to/folder/tsconfig.json
        project: ".",
      },
    },
  },
  root: true,
};
