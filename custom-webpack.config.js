const webpack = require('webpack');
const { patchPostCSSPlugins } = require("./tailwind-nesting-patch");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'STABLE_FEATURE': JSON.stringify(true),
            'EXPERIMENTAL_FEATURE': JSON.stringify(false)
        })
    ],
    webpackFinal: async (config, {configType}) => {
        // apply any global webpack configs that might have been specified in .storybook/main.js
        if (rootMain.webpackFinal) {
            config = await rootMain.webpackFinal(config, {configType});
        }

        // workaround because of issue with multiple static dirs ("staticDir" option in config) with
        // same dist folder (dir already exists)
        // issue link: https://github.com/storybookjs/storybook/issues/16732
        if (configType === 'PRODUCTION') {
            await fs.copy(
                path.join(__dirname, '../../../node_modules/@taiga-ui/icons/src'),
                `${config.output.path}/assets/taiga-ui/icons`
            );
        }

        // add tailwind nesting
        patchPostCSSPlugins(config);
        // add your own webpack tweaks if needed

        return config;
    },
};
