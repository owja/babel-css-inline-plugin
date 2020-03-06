import {dirname, extname, resolve} from "path";
import {existsSync} from "fs";

import * as babel from "@babel/core";
import {ImportDeclaration} from "@babel/types";
import {NodePath, PluginObj} from "@babel/core";

// Main Babel Plugin Function
export default function({types: t}: typeof babel): PluginObj {
    return {
        name: "css inline",
        visitor: {
            ImportDeclaration(path: NodePath<ImportDeclaration>, pass: any) {
                if (path.node.specifiers.length !== 1 || path.node.specifiers[0].type !== "ImportDefaultSpecifier") return;

                const styles = stylesheet(path.node.source.value, pass.file);
                if (typeof styles !== "string") return;

                const variableDeclaration = t.variableDeclaration('const', [
                    t.variableDeclarator(path.node.specifiers[0].local, t.stringLiteral(styles))
                ]);

                path.replaceWith(variableDeclaration);
            }
        }
    };
}

// load the file, parse it and return the styles
function stylesheet(path: string, fileObject: any): void | string {
    const extension = extname(path);
    if ([".css"].indexOf(extension.toLowerCase()) === -1) return;

    const referer = fileObject.opts.filename;
    const file = resolve(dirname(referer), path);

    if (!existsSync(file)) {
        throw new Error(`The css file "${file}" does not exist.`);
    }

    try {
        return require('child_process')
            .execSync(`npx -f -q postcss ${file} --use autoprefixer cssnano --no-map`)
            .toString();
    } catch (e) {
        throw new Error(`The css file "${file}" could not parsed.`);
    }
}
