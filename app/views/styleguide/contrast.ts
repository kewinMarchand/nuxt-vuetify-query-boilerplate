export type ContrastLevel = 'AAA' | 'AA' | 'insuffisant'

const AAA_RATIO = 7
const AA_RATIO = 4.5

const channel = (value: number) => {
  const normalized = value / 255
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
}

const parseHex = (hex: string) => {
  const digits = hex.replace('#', '')
  const full =
    digits.length === 3 ? [...digits].map((digit) => digit + digit).join('') : digits.slice(0, 6)
  return [0, 2, 4].map((start) => parseInt(full.slice(start, start + 2), 16))
}

export const relativeLuminance = (hex: string) => {
  const [red = 0, green = 0, blue = 0] = parseHex(hex).map(channel)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export const contrastRatio = (foreground: string, background: string) => {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  )
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05)
}

export const contrastLevel = (ratio: number): ContrastLevel => {
  if (ratio >= AAA_RATIO) return 'AAA'
  if (ratio >= AA_RATIO) return 'AA'
  return 'insuffisant'
}
