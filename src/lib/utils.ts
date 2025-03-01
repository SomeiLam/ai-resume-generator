import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const removeProtocal = (url: string) => url.replace(/^https?:\/\//, '')

export const formatYearMonth = (dateString: string): string => {
  // Assumes dateString is in "YYYY-MM" format (e.g., "2021-01")
  const [year, month] = dateString.split('-')
  // Create a local date; note: months are zero-indexed (0 = January)
  const date = new Date(Number(year), Number(month) - 1, 1)
  return format(date, 'MMM yyyy') // e.g., "Jan 2021"
}
