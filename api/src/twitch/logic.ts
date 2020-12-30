import { COLORS, MAX_TILES } from './constants'

export function parseMessage(message: string) {
  const matches = new RegExp(/^(\w)(\d{1,2})(\w{3})$/gi).exec(message.trim())
  if (!matches) {
    return null
  }

  const x = matches[1].toLowerCase().charCodeAt(0) - 96
  if (x <= 0 || x > MAX_TILES) {
    return null
  }

  const y = parseInt(matches[2])
  if (y <= 0 || y > MAX_TILES) {
    return null
  }

  const color = COLORS[matches[3].toUpperCase()]
  if (!color) {
    return null
  }

  return { x, y, color }
}
