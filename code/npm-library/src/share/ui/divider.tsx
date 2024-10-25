import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/share/libs'

const DividerVariants = cva('bg-[#E5E5E5]', {
  variants: {
    width: {
      default: 'w-[393px]',
      full: 'w-full',
    },
    thickness: {
      default: 'h-[1px]',
      bolder: 'h-[0.75rem]',
    },
  },
  defaultVariants: {
    width: 'default',
    thickness: 'default',
  },
})

type Props = VariantProps<typeof DividerVariants>

export function Divider({ thickness, width, ...props }: Props) {
  return <div className={cn(DividerVariants({ thickness, width }))} {...props} />
}
