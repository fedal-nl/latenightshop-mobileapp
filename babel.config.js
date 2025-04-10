module.exports = function(api) {
    api.cache(true);
    // const env = process.env.APP_ENV || 'development';
    // console.log(`Babel config loaded for environment: ${env}`);

    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel"],

        plugins: [
            ["module-resolver", {
                root: ["./"],
                alias: {
                    "@": "./",
                    "tailwind.config": "./tailwind.config.js"
                }
            }
        ],
        // ,["inline-dotenv", {
        //     path: `.env.${env} || 'development'}` }
        // ],
        // ["module:react-native-dotenv", {
        //     "moduleName": "@env",
        //     "path": `.env.${env}`,
        //   }]
    ]
    };
};