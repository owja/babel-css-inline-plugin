import pluginTester from "babel-plugin-tester";
import { join } from "path";

import plugin from "../plugin";

pluginTester({
    plugin,
    fixtures: join(__dirname, "fixtures"),
    formatResult: (v: string) => v,
    tests: [
        {
            title: "Fails on none existing files",
            fixture: join(__dirname, "fixtures-with-error/missing-css.js"),
            error: /The css file \"(.*)\" does not exist\./
        },
        {
            title: "Should error",
            fixture: join(__dirname, "fixtures-with-error/bad-css.js"),
            error: /The css file \"(.*)\" could not parsed\./
        },
        {
            title: "Should ignore files without extension",
            code: 'import {something} from "somewhere";',
            output: 'import { something } from "somewhere";'
        },
        {
            title: "Should ignore files with none css extension",
            code: 'import something from "json.json";',
            output: 'import something from "json.json";'
        },
        {
            title: "Should ignore files without a specifier",
            code: 'import "hello.css";',
            output: 'import "hello.css";'
        },
        {
            title: "Should ignore module imports",
            code: 'import {what} from "what.css";',
            output: 'import { what } from "what.css";'
        }
    ]
});
