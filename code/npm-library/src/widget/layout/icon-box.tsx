import Image from 'next/image'
import React from 'react'
import './icon-box.sass'

type Props = {
  type: 'default' | 'home' | 'chat'
  icon: 0 | 1 | 2
}

export function IconBox({ icon = 0, type = 'default' }: Props) {
  switch (icon) {
    case 0:
      return <div className="icon-box__empty" />
    case 1:
      return (
        <div className="icon-box__icon">
          <Image fill src="/svg/more-vert.svg" alt="더보기 아이콘" />
        </div>
      )
    case 2:
      return (
        <div className="icon-box__group">
          <div className="icon-box__icon">
            <Image fill src="/svg/search.svg" alt="검색 아이콘" />
          </div>
          <div className="icon-box__icon">
            {type === 'home' ? (
              <Image fill src="/svg/more-vert.svg" alt="더보기 아이콘" />
            ) : (
              <Image fill src="/svg/notification.svg" alt="알림 아이콘" />
            )}
          </div>
        </div>
      )
    default:
      return <></>;
  }
}
