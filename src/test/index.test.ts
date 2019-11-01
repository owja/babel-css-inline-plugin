import pluginTester from "babel-plugin-tester";
import {join} from "path";

import plugin from "../plugin";

pluginTester({
    plugin,
    fixtures: join(__dirname, 'fixtures'),
});
