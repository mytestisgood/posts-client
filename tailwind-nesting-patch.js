function addNestingPluginToPostCSSOptions(loader) {
  // save config function to reuse
  const originPostcssOptions = loader.options.postcssOptions;

  loader.options.postcssOptions = (loader) => {
    const options = originPostcssOptions(loader);

    // find tailwindcss index
    const insertIndex = options.plugins.findIndex(
      ({postcssPlugin}) => postcssPlugin && postcssPlugin.toLowerCase() === "tailwindcss"
    );
    if (insertIndex !== -1) {
      // nesting plugin should be inserted BEFORE tailwind plugin
      options.plugins.splice(insertIndex, 0, ["tailwindcss/nesting"]);
    } else {
      console.error("tailwindcss not found in postcss plugins");
    }

    return options;
  };
}

function patchPostCSSPlugins(webpackConfig) {
  // we should find and patch all postcss loaders in css rules
  for (const rule of webpackConfig.module.rules) {
    if (!(rule.test.toString().includes('(?:css)'))) {
      continue;
    }
    for (const subRule of rule.rules) {
      if (!subRule.oneOf) {
        continue;
      }
      for (const subSubRule of subRule.oneOf) {
        for (const useLoader of subSubRule.use) {
          if (!(useLoader.options && useLoader.options.postcssOptions)) {
            continue;
          }

          addNestingPluginToPostCSSOptions(useLoader);
        }
      }
    }
  }
}

module.exports = {
  patchPostCSSPlugins,
}
