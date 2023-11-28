function convertToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, function (match: string, group1: string) {
      return group1.toUpperCase()
    })
  }
  
  type Point = [number, number]
  
  function calculateBezier(t: number, p1: Point, p2: Point): number {
    const u = 1 - t
    const tt = t * t
    const uu = u * u
    const uuu = uu * u
    const ttt = tt * t
  
    return uuu * 0 + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * 1
  }
  
  type EasingFunction = (progress: number) => number
  
  interface EasingFunctions {
    [key: string]: EasingFunction
  }
  
  const easingFunctions: EasingFunctions = {
    linear: function (progress: number): number {
      return progress
    },
    easeIn: function (progress: number): number {
      return progress * progress
    },
    easeOut: function (progress: number): number {
      return progress * (2 - progress)
    },
    easeInOut: function (progress: number): number {
      return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress
    },
  }
  
  function getEasingFunction(easing: string): EasingFunction {
    // 将 easing 转换为驼峰命名
    const easingCamelCase = convertToCamelCase(easing)
  
    // 如果 easing 是预定义的缓动函数之一，直接返回对应的函数
    if (easingFunctions[easingCamelCase]) {
      return easingFunctions[easingCamelCase]
    }
  
    // 如果 easing 是一个贝塞尔曲线函数，解析参数并返回一个贝塞尔曲线函数
    if (easing.startsWith('cubic-bezier')) {
      // 使用正则表达式解析参数
      const match = easing.match(/cubic-bezier\(([^,]+),([^,]+),([^,]+),([^,]+)\)/)
      if (match) {
        const p1: Point = [+match[1], +match[2]]
        const p2: Point = [+match[3], +match[4]]
  
        // 检查参数是否都是有效的数字
        if (p1.some(isNaN) || p2.some(isNaN)) {
          throw new Error('Invalid arguments for cubic-bezier')
        }
  
        // 检查 x 值是否在 0 到 1 之间
        if (p1[0] < 0 || p1[0] > 1 || p2[0] < 0 || p2[0] > 1) {
          throw new Error('The x values of the control points must be between 0 and 1')
        }
  
        return function (progress: number): number {
          return calculateBezier(progress, p1, p2)
        }
      }
    }
  
    // 如果 easing 是未知的，返回默认的线性缓动函数
    return easingFunctions.linear
  }
  
  function hslToRgb(h, s, l) {
    let r, g, b
  
    if (s == 0) {
      r = g = b = l // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
  
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
  
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: 1,
    }
  }
  function rgbaToHsla({ r, g, b, a }) {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2
  
    if (max == min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
  
    return [h, s, l, a]
  }
  function parseColor(color) {
    // 处理颜色关键字
    const w3cx11 = {
      aliceblue: '#f0f8ff',
      antiquewhite: '#faebd7',
      aqua: '#00ffff',
      aquamarine: '#7fffd4',
      azure: '#f0ffff',
      beige: '#f5f5dc',
      bisque: '#ffe4c4',
      black: '#000000',
      blanchedalmond: '#ffebcd',
      blue: '#0000ff',
      blueviolet: '#8a2be2',
      brown: '#a52a2a',
      burlywood: '#deb887',
      cadetblue: '#5f9ea0',
      chartreuse: '#7fff00',
      chocolate: '#d2691e',
      coral: '#ff7f50',
      cornflower: '#6495ed',
      cornflowerblue: '#6495ed',
      cornsilk: '#fff8dc',
      crimson: '#dc143c',
      cyan: '#00ffff',
      darkblue: '#00008b',
      darkcyan: '#008b8b',
      darkgoldenrod: '#b8860b',
      darkgray: '#a9a9a9',
      darkgreen: '#006400',
      darkgrey: '#a9a9a9',
      darkkhaki: '#bdb76b',
      darkmagenta: '#8b008b',
      darkolivegreen: '#556b2f',
      darkorange: '#ff8c00',
      darkorchid: '#9932cc',
      darkred: '#8b0000',
      darksalmon: '#e9967a',
      darkseagreen: '#8fbc8f',
      darkslateblue: '#483d8b',
      darkslategray: '#2f4f4f',
      darkslategrey: '#2f4f4f',
      darkturquoise: '#00ced1',
      darkviolet: '#9400d3',
      deeppink: '#ff1493',
      deepskyblue: '#00bfff',
      dimgray: '#696969',
      dimgrey: '#696969',
      dodgerblue: '#1e90ff',
      firebrick: '#b22222',
      floralwhite: '#fffaf0',
      forestgreen: '#228b22',
      fuchsia: '#ff00ff',
      gainsboro: '#dcdcdc',
      ghostwhite: '#f8f8ff',
      gold: '#ffd700',
      goldenrod: '#daa520',
      gray: '#808080',
      green: '#008000',
      greenyellow: '#adff2f',
      grey: '#808080',
      honeydew: '#f0fff0',
      hotpink: '#ff69b4',
      indianred: '#cd5c5c',
      indigo: '#4b0082',
      ivory: '#fffff0',
      khaki: '#f0e68c',
      laserlemon: '#ffff54',
      lavender: '#e6e6fa',
      lavenderblush: '#fff0f5',
      lawngreen: '#7cfc00',
      lemonchiffon: '#fffacd',
      lightblue: '#add8e6',
      lightcoral: '#f08080',
      lightcyan: '#e0ffff',
      lightgoldenrod: '#fafad2',
      lightgoldenrodyellow: '#fafad2',
      lightgray: '#d3d3d3',
      lightgreen: '#90ee90',
      lightgrey: '#d3d3d3',
      lightpink: '#ffb6c1',
      lightsalmon: '#ffa07a',
      lightseagreen: '#20b2aa',
      lightskyblue: '#87cefa',
      lightslategray: '#778899',
      lightslategrey: '#778899',
      lightsteelblue: '#b0c4de',
      lightyellow: '#ffffe0',
      lime: '#00ff00',
      limegreen: '#32cd32',
      linen: '#faf0e6',
      magenta: '#ff00ff',
      maroon: '#800000',
      maroon2: '#7f0000',
      maroon3: '#b03060',
      mediumaquamarine: '#66cdaa',
      mediumblue: '#0000cd',
      mediumorchid: '#ba55d3',
      mediumpurple: '#9370db',
      mediumseagreen: '#3cb371',
      mediumslateblue: '#7b68ee',
      mediumspringgreen: '#00fa9a',
      mediumturquoise: '#48d1cc',
      mediumvioletred: '#c71585',
      midnightblue: '#191970',
      mintcream: '#f5fffa',
      mistyrose: '#ffe4e1',
      moccasin: '#ffe4b5',
      navajowhite: '#ffdead',
      navy: '#000080',
      oldlace: '#fdf5e6',
      olive: '#808000',
      olivedrab: '#6b8e23',
      orange: '#ffa500',
      orangered: '#ff4500',
      orchid: '#da70d6',
      palegoldenrod: '#eee8aa',
      palegreen: '#98fb98',
      paleturquoise: '#afeeee',
      palevioletred: '#db7093',
      papayawhip: '#ffefd5',
      peachpuff: '#ffdab9',
      peru: '#cd853f',
      pink: '#ffc0cb',
      plum: '#dda0dd',
      powderblue: '#b0e0e6',
      purple: '#800080',
      purple2: '#7f007f',
      purple3: '#a020f0',
      rebeccapurple: '#663399',
      red: '#ff0000',
      rosybrown: '#bc8f8f',
      royalblue: '#4169e1',
      saddlebrown: '#8b4513',
      salmon: '#fa8072',
      sandybrown: '#f4a460',
      seagreen: '#2e8b57',
      seashell: '#fff5ee',
      sienna: '#a0522d',
      silver: '#c0c0c0',
      skyblue: '#87ceeb',
      slateblue: '#6a5acd',
      slategray: '#708090',
      slategrey: '#708090',
      snow: '#fffafa',
      springgreen: '#00ff7f',
      steelblue: '#4682b4',
      tan: '#d2b48c',
      teal: '#008080',
      thistle: '#d8bfd8',
      tomato: '#ff6347',
      turquoise: '#40e0d0',
      violet: '#ee82ee',
      wheat: '#f5deb3',
      white: '#ffffff',
      whitesmoke: '#f5f5f5',
      yellow: '#ffff00',
      yellowgreen: '#9acd32',
    }
    if (w3cx11[color.toLowerCase()]) {
      color = w3cx11[color.toLowerCase()]
    }
  
    // 处理十六进制颜色
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
    if (result)
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
  
    // 处理rgb(...)
    result = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(color)
    if (result) {
      const r = parseInt(result[1], 10)
      const g = parseInt(result[2], 10)
      const b = parseInt(result[3], 10)
  
      if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
        throw new Error(`Invalid color value: ${color} hints: 0 <= r, g, b <= 255`)
      }
  
      return { r, g, b, a: 1 }
    }
  
    // 处理rgba(...)
    result = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)\s*\)$/i.exec(color)
    if (result) {
      const r = parseInt(result[1], 10)
      const g = parseInt(result[2], 10)
      const b = parseInt(result[3], 10)
      const a = parseFloat(result[4])
  
      if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0 || a > 1 || a < 0) {
        throw new Error(`Invalid color value: ${color} hints: 0 <= r, g, b <= 255, 0 <= a <= 1`)
      }
  
      return { r, g, b, a }
    }
  
    // 处理hsl(...)
    result = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i.exec(color)
    if (result) {
      const h = parseInt(result[1], 10)
      const s = parseInt(result[2], 10)
      const l = parseInt(result[3], 10)
  
      if (h > 360 || h < 0 || s > 100 || s < 0 || l > 100 || l < 0) {
        throw new Error(`Invalid color value: ${color} hints: 0 <= h <= 360, 0% <= s, l <= 100%`)
      }
  
      const hsla = hslToRgb(h / 360, s / 100, l / 100)
      return hsla
    }
  
    // 处理hsla(...)
    result = /^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+(?:\.\d+)?)\s*\)$/i.exec(color)
    if (result) {
      const h = parseInt(result[1], 10)
      const s = parseInt(result[2], 10)
      const l = parseInt(result[3], 10)
      const a = parseFloat(result[4])
  
      if (h > 360 || h < 0 || s > 100 || s < 0 || l > 100 || l < 0 || a > 1 || a < 0) {
        throw new Error(
          `Invalid color value: ${color} hints: 0 <= h <= 360, 0% <= s, l <= 100%, 0 <= a <= 1`,
        )
      }
  
      const rgb = hslToRgb(h / 360, s / 100, l / 100)
  
      return { ...rgb, a }
    }
  
    throw new Error(`Invalid color value ${color}`)
  }
  
  function interpolateColor(startColor, endColor, progress) {
    const startHsla = rgbaToHsla(parseColor(startColor))
    const endHsla = rgbaToHsla(parseColor(endColor))
    // 计算插值后的 HSLA 值
    const h = startHsla[0] + progress * (endHsla[0] - startHsla[0])
    const s = startHsla[1] + progress * (endHsla[1] - startHsla[1])
    const l = startHsla[2] + progress * (endHsla[2] - startHsla[2])
    const a = startHsla[3] + progress * (endHsla[3] - startHsla[3])
  
    // 将 HSLA 值转换回颜色字符串
    return `hsla(${h * 360},${s * 100}%,${l * 100}%,${a})`
  }
  interface AnimationOptions {
    delay: number
    endDelay: number
    fill: 'auto' | 'forwards' | 'backwards' | 'both' | 'none'
    duration: number
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    easing:
      | 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-out'
      | 'ease-in-out'
      | 'step-start'
      | 'step-end'
      | string
    iterations: number | 'Infinity'
  }
  
  const defaultOptions: AnimationOptions = {
    delay: 0,
    endDelay: 0,
    fill: 'auto',
    duration: 1000,
    direction: 'normal',
    easing: 'linear',
    iterations: 1,
  }
  
  type CSSValue = string | number
  // todo startState & endState  anyValue
  interface State {
    [key: string]: CSSValue
  }
  
  type UpdateFunction = (state: State) => void
  
  export const animate = function (
    partialOptions: Partial<AnimationOptions> = {},
    startState: State,
    endState: State,
    updateFunc: UpdateFunction,
  ) {
    const options: AnimationOptions = Object.assign({}, defaultOptions, partialOptions)
    const easingFunction: EasingFunction = getEasingFunction(options.easing)
    let cancelled = false
    let startTime = performance.now() + options.delay
    let iterationCount = 1
  
    function animation() {
      if (cancelled) return
      const elapsed = performance.now() - startTime
      if (elapsed < 0) {
        // 如果还在 delay 阶段，继续下一帧动画
        requestAnimationFrame(animation)
        return
      }
  
      const rawProgress = Math.min(elapsed / options.duration, 1)
      let progress = rawProgress
      switch (options.direction) {
        case 'reverse':
          progress = 1 - rawProgress
          break
        case 'alternate':
          if (iterationCount % 2 === 0) {
            progress = 1 - rawProgress
          }
          break
        case 'alternate-reverse':
          if (iterationCount % 2 === 1) {
            progress = 1 - rawProgress
          }
          break
      }
      progress = easingFunction(progress)
  
      // 处理动画的填充模式
      switch (options.fill) {
        case 'none':
          if (elapsed < 0 || elapsed > options.duration) {
            progress = 0
          }
          break
        case 'forwards':
          if (elapsed > options.duration) {
            progress = 1
          }
          break
        case 'backwards':
          if (elapsed < 0) {
            progress = 0
          }
          break
        case 'both':
          if (elapsed < 0) {
            progress = 0
          } else if (elapsed > options.duration) {
            progress = 1
          }
          break
        // 默认无填充模式，无需修改 progress
      }
  
      // 计算当前的值
      const currentValues: State = {}
      for (const key in startState) {
        if (key.toLowerCase().includes('color')) {
          currentValues[key] = interpolateColor(startState[key], endState[key], progress)
        } else {
          currentValues[key] =
            (startState[key] as number) +
            progress * (((endState[key] as number) - startState[key]) as number)
        }
      }
  
      // 将当前的值传递给用户的 update 函数
      updateFunc(currentValues)
  
      // 考虑是否继续下一帧动画
      if (rawProgress < 1 || elapsed < options.duration + options.endDelay) {
        requestAnimationFrame(animation)
      } else {
        if (options.iterations === 'Infinity' || options?.iterations > iterationCount) {
          startTime = performance.now()
          iterationCount++
          requestAnimationFrame(animation)
        }
      }
    }
  
    requestAnimationFrame(animation)
  
    return {
      cancel: () => {
        cancelled = true
      },
    }
  }
  