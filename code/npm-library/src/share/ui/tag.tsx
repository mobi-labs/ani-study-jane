'use client'

import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

import { cn } from '@/share/libs'

const TagVariants = cva('leading-[120%] text-[12px] inline-flex justify-center items-center px-[6px] py-[3px]', {
  variants: {
    color: {
      Grey: 'text-paragraph2 bg-gray-scale-2',
      Red: 'bg-red-1 text-red-5',
      Green: 'bg-green-2 text-green-7',
      Blue: 'bg-blue-1 text-blue-6',
      Default: 'text-paragraph1 bg-gray-scale-white border-solid border-[1px] border-solid border-[#E5E5E5]',
    },
    rectangle: {
      circle: 'rounded-[50px]',
      square: 'rounded-[2px]',
    },
  },
  defaultVariants: {
    color: 'Default',
    rectangle: 'circle',
  },
})

type Props = VariantProps<typeof TagVariants>

export function Tag({ children, rectangle, color, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={'text-caption4' + cn(TagVariants({ rectangle, color }))} {...props}>
      {children}
    </div>
  )
}
