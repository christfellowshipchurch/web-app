module.exports = {
    webpack: {
        configure: (ogWebpack, { env, paths }) => {
            const webpackConfig = ogWebpack;
            if (!webpackConfig.resolve.extensions) {
                webpackConfig.resolve.extensions = [];
            }

            const { extensions } = webpackConfig.resolve;
            if (process.env.REACT_APP_ENABLE_SANDBOX && process.env.REACT_APP_ENABLE_SANDBOX === 'true') {
                webpackConfig.resolve.extensions = [
                    '.sandbox.js',
                    ...extensions,
                ];
            }

            return webpackConfig;
        },
    },
};
