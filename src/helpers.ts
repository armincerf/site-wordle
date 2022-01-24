declare namespace Intl {
  type ListType = 'conjunction' | 'disjunction'

  interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit'
    type?: ListType
    style?: 'long' | 'short' | 'narrow'
  }

  interface ListFormatPart {
    type: 'element' | 'literal'
    value: string
  }

  class ListFormat {
    constructor(locales?: string | string[], options?: ListFormatOptions)
    format(values: any[]): string
    formatToParts(values: any[]): ListFormatPart[]
    supportedLocalesOf(
      locales: string | string[],
      options?: ListFormatOptions
    ): string[]
  }
}

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  if (value === null || value === undefined) return false
  return true
}

export function dateStr() {
  const date = new Date()
  return date.toLocaleDateString('en-GB')
}

export function genGameId(username: string) {
  const date = dateStr()
  return username + 'wordleGame' + date
}

export const joinList = (list: string[]) => formatter.format(list)
