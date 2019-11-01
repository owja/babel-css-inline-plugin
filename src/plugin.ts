import {dirname, extname, resolve} from "path";
import {readFileSync} from "fs";

import * as types from "@babel/types";
import {ImportDeclaration} from "@babel/types";
import {NodePath} from "@babel/traverse";

import {processCss} from "./postcss";

const extensions = [".css"];

// Main Babel Plugin Function
export default function({ types: t }: {types: typeof types}) {
    return {
        name: "css inline",
        visitor: {
            ImportDeclaration(path: NodePath<ImportDeclaration>, pass: any) {
                if (path.node.specifiers.length !== 1) return;

                const styles = getStylesheet(path.node.source.value, pass.file);
                if (typeof styles !== "string") return;

                const variableDeclaration = t.variableDeclaration('const', [
                    t.variableDeclarator(path.node.specifiers[0].local, t.stringLiteral(styles))
                ]);

                path.replaceWith(variableDeclaration);
            }
        }
    };
}

// Reading styles from file and pass to css processor
function getStylesheet(path: string, fileObject: any): void | string {
    const extension = extname(path);
    if (extensions.indexOf(extension) === -1) return;

    const referer = fileObject.opts.filename;
    const cssFile = resolve(dirname(referer), path);
    const styles = readFileSync(cssFile);

    return processCss(styles.toString());
}

