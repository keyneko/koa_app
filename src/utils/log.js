let logColor = '#4393E4'
const debug = process.env.NODE_ENV === 'development' || false

export function color() {
  logColor = 'hsla(' + Math.floor(Math.random() * 360) + ',100%,50%,1)'
}

export function log(value, color, w = 4) {
  debug &&
    console.log(
      `%c${value}`,
      `
        border-width: 0px;
        border-style: solid;
        border-color: ${color || logColor};
        border-left-width: ${w}px;
        border-bottom-width: 1px;
        padding-left:2px
      `
    )
}

export default {
  color,
  log,
}
