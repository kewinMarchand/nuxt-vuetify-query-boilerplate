const MAX_PAGES_WITHOUT_ELLIPSIS = 7

export type PaginationEntry = number | 'ellipsis'

export const paginationWindow = (page: number, pageCount: number): PaginationEntry[] => {
  if (pageCount <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }
  const pages = [1, page - 1, page, page + 1, pageCount].filter(
    (candidate, index, list) =>
      candidate >= 1 && candidate <= pageCount && list.indexOf(candidate) === index,
  )
  return pages.flatMap((current, index) => {
    const previous = pages[index - 1]
    return previous !== undefined && current - previous > 1
      ? ['ellipsis' as const, current]
      : [current]
  })
}
