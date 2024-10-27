import Image from 'next/image'
import { ComponentProps, PropsWithChildren, ReactNode } from 'react'

import { Logo } from '../../share/ui'
import { IconBox } from '../layout'
import React from 'react'
import './app-bar.sass'
import classNames from 'classnames'

type IconProps = Pick<ComponentProps<typeof IconBox>, 'icon'>

type ChatContentProps = {
  count?: number
} & IconProps

function ChatContent({ icon, count, children }: PropsWithChildren<ChatContentProps>) {
  return (
    <>
      <div className='chat-content'>
        <div className="icon">
          <Image width={11} height={20} src="/svg/arrow-left.svg" alt="뒤로가기 아이콘" />
        </div>
        <span className="text">{children}</span>
        {!!count && <span className="count">{count}</span>}
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
    <div className="default-content">
      <div className="icon">
        <Image width={11} height={20} src="/svg/arrow-left.svg" alt="뒤로가기 아이콘" />
      </div>
      <div className="title">{children}</div>
      {textButton ? textButton : <IconBox type={'default'} icon={icon} />}
    </div>
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

function AppBarContainer({ children, line = false }: PropsWithChildren<AppBarContainerProps>) {
  return (
    <div className={classNames('app-bar', { 'app-bar--line': line })}>
      {children}
    </div>
  );
}

export const AppBar = Object.assign(AppBarContainer, {
  ChatContent,
  DefaultContent,
  HomeContent,
})
