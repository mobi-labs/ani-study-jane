## rollup.js 사용하여 프로젝트 빌드하기

1. **_RollupError: Node tried to load your configuration ..._**

```bash
[!] RollupError: Node tried to load your configuration as an ES module even though it is likely CommonJS. To resolve this, change the extension of your configuration to ".cjs" or pass the "--bundleConfigAsCjs" flag.

Original error: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 'C:\data\ani-study-jane\code\sass-test\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

```bash
[!] RollupError: Node tried to load your configuration file as CommonJS even though it is likely an ES module. To resolve this, change the extension of your configuration to ".mjs", set "type": "module" in your package.json file or pass the "--bundleConfigAsCjs" flag.

Original error: Cannot use import statement outside a module
```

- `rollup.config` 파일의 확장자를 `.js`, `.mjs`, `.cjs`로 모두 바꾸어 봤으나 해결되지 않았습니다.
- 문제는 `rollup.config.js` 내에서 `package.json` 파일을 import 해오는 코드였습니다.

```js
// require문 사용
const pkg = require("./package.json");
```

- 위의 코드를 아래의 방식으로 수정하여 문제를 해결하였습니다.

```js
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
const pkg = requireFile("./package.json");
```

2. **_Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0._**

- **BEFORE**: `import postcss from "rollup-plugin-postcss"`
- **AFTER**: `import sass from "rollup-plugin-sass"`

3. **_RollupError: You must specify "output.file" or "output.dir" for the build._**
   `package.json`에 아래의 설정을 추가하여 해결하였습니다.

```json
{
  "module": "./dist/index.es.js",
  "browser": "./dist/index.umd.js",
  "types": "./dist/index.d.ts"
}
```
