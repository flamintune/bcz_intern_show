// craco.config.js
const { POSTCSS_MODES } = require('@craco/craco');
console.log(POSTCSS_MODES)
module.exports = {
    style: {
        postcss: {
            plugins: [
                require('postcss-px-to-viewport')({
                    unitToConvert: 'px',
                    viewportWidth: 375,
                    viewportUnit: 'vw',
                    fontViewportUnit: 'vw',
                    unitPrecision: 6,
                    minPixelValue: 1,
                    propList: ['*'],
                }),
                require('postcss-preset-env')({
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                require('postcss-normalize')({})
            ]
        },
    },
};
