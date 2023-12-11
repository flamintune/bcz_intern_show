import postcssPxToViewport from 'postcss-px-to-viewport'
import postcssPresetEnv from 'postcss-preset-env'
import postcssNormalize from 'postcss-normalize'
const plugins = [
  /**
   * Write your CSS rules without vendor prefixes
   * @link https://www.npmjs.com/package/autoprefixer
   */
  /**
   * A plugin for PostCSS that generates viewport units (vw, vh, vmin, vmax) from pixel units.
   * @link https://www.npmjs.com/package/postcss-px-to-viewport
   */
  postcssPxToViewport({
    unitToConvert: 'px',
    viewportWidth: 375,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    unitPrecision: 6,
    minPixelValue: 1,
    propList: ['*'],
  }),

  /**
   * PostCSS Preset Env lets you convert modern CSS into something most browsers can understand,
   * determining the polyfills you need based on your targeted browsers or runtime environments.
   * @link https://www.npmjs.com/package/postcss-preset-env
   */
  postcssPresetEnv({
    autoprefixer: {
      flexbox: 'no-2009',
    },
    stage: 3,
  }),

  /**
   * PostCSS Normalize lets you use the parts of `normalize.css` or `sanitize.css`
   * that you need from your browserslist.
   * @link https://www.npmjs.com/package/postcss-normalize
   */
  postcssNormalize(),
]


module.exports = {
  plugins
}