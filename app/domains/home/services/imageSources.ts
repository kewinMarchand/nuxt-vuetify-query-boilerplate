const FORMATS = ['avif', 'webp'] as const

export const buildSrcset = (base: string, widths: number[], format: string) =>
  widths.map((width) => `/images/${base}-${width}.${format} ${width}w`).join(', ')

export const buildSources = (base: string, widths: number[]) =>
  FORMATS.map((format) => ({ type: `image/${format}`, srcset: buildSrcset(base, widths, format) }))
