import { ReactNode } from 'react'

declare type PropsShouldWithChildren<P = unknown> = {
  children: ReactNode
} & P
