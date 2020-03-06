import {dirname, extname, resolve} from "path";
import {existsSync} from "fs";

// load the file, parse it and return the styles
export function stylesheet(path: string, fileObject: any): void | string {
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
