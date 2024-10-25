import Image from 'next/image'
import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/share/libs'
import { PropsShouldWithChildren } from '@/share/types'
import { Logo } from '@/share/ui'
import { IconBox } from '@/widget/layout/icon-box'

type IconProps = Pick<ComponentProps<typeof IconBox>, 'icon'>

type ChatContentProps = {
  count?: number
} & IconProps

function ChatContent({ icon, count, children }: PropsWithChildren<ChatContentProps>) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex h-6 w-6 items-center justify-center">
          <Image width={11} height={20} src="/svg/arrow-left.svg" alt="뒤로가기 아이콘" />
        </div>
        <span className="text-center text-body4">{children}</span>
        {!!count && <span className="text-caption2 text-text-secondary">{count}</span>}
      </div>
      <IconBox type={'chat'} icon={icon} />
    </>
  )
}

type DefaultContentProps = {
  textButton?: ReactNode
} & IconProps

function DefaultContent({ children, icon, textButton }: PropsWithChildren<DefaultContentProps>) {
  return (
    <>
      <div className="relative flex h-6 w-6 items-center justify-center">
        <Image width={11} height={20} src="/svg/arrow-left.svg" alt="뒤로가기 아이콘" />
      </div>
      <div className="absolute left-1/2 translate-x-[-50%] text-center text-body2 text-gray-scale-9">{children}</div>
      {textButton ? textButton : <IconBox type={'default'} icon={icon} />}
    </>
  )
}

type HomeContentProps = IconProps

function HomeContent({ icon }: HomeContentProps) {
  return (
    <>
      <Logo />
      <IconBox type={'home'} icon={icon} />
    </>
  )
}

type AppBarContainerProps = {
  line?: boolean
}

function AppBarContainer({ children, line = false }: PropsShouldWithChildren<AppBarContainerProps>) {
  return (
    <div
      className={cn('relative flex h-[56px] items-center justify-between px-5 py-[14px]', { 'border-b-[1px]': line })}
    >
      {children}
    </div>
  )
}

export const AppBar = Object.assign(AppBarContainer, {
  ChatContent,
  DefaultContent,
  HomeContent,
})
