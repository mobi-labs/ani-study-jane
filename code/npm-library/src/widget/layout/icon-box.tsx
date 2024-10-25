import Image from 'next/image'

type Props = {
  type: 'default' | 'home' | 'chat'
  icon: 0 | 1 | 2
}

export function IconBox({ icon = 0, type = 'default' }: Props) {
  switch (icon) {
    case 0:
      return <div />
    case 1:
      return (
        <div className="relative h-5 w-5">
          <Image fill src="/svg/more-vert.svg" alt="더보기 아이콘" />
        </div>
      )
    case 2:
      return (
        <div className="flex items-start gap-4 ">
          <div className="relative h-5 w-5">
            <Image fill src="/svg/search.svg" alt="검색 아이콘" />
          </div>
          <div className="relative h-5 w-5">
            {type === 'home' ? (
              <Image fill src="/svg/more-vert.svg" alt="더보기 아이콘" />
            ) : (
              <Image fill src="/svg/notification.svg" alt="알림 아이콘" />
            )}
          </div>
        </div>
      )
  }
}
