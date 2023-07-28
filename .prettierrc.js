const { PRESET_KEYS } = require('prettier-plugin-organize-attributes/lib/presets');
const presets = {
    head: [
        '^smarti',
        PRESET_KEYS.$ANGULAR_STRUCTURAL_DIRECTIVE,
        PRESET_KEYS.$ANGULAR_ELEMENT_REF,
        '^i18n$',

        PRESET_KEYS.$CLASS,
        PRESET_KEYS.$ID,
        PRESET_KEYS.$NAME,
        PRESET_KEYS.$DATA,
        PRESET_KEYS.$SRC,
        PRESET_KEYS.$FOR,
        PRESET_KEYS.$TYPE,
        PRESET_KEYS.$HREF,
        PRESET_KEYS.$VALUE,
        PRESET_KEYS.$TITLE,
        PRESET_KEYS.$ALT,
        PRESET_KEYS.$ROLE,
        PRESET_KEYS.$ARIA,
    ],

    angular: [
        PRESET_KEYS.$ANGULAR_ANIMATION,
        PRESET_KEYS.$ANGULAR_ANIMATION_INPUT,

        PRESET_KEYS.$ANGULAR_INPUT,

        PRESET_KEYS.$ANGULAR_TWO_WAY_BINDING,

        PRESET_KEYS.$ANGULAR_OUTPUT,
    ],

    footer: ['$DEFAULT'],
};

module.exports = {
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    semi: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'avoid',
    useTabs: false,
    overrides: [
        {
            files: '*.html',
            options: {
                printWidth: 120,
                bracketSameLine: false,
                parser: 'angular',
                attributeGroups: [...presets.head, ...presets.angular, ...presets.footer],
                singleQuote: false,
                htmlWhitespaceSensitivity: 'ignore',
                singleAttributePerLine: true,
                endOfLine: 'auto',
            },
        },
        {
            files: '*.css',
            options: {
                printWidth: 120,
                parser: 'css',
                singleQuote: false,
            },
        },
        {
            files: '*.ts',
            options: {
                printWidth: 120,
                parser: 'typescript',
            },
        },
    ],
};
