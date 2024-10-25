import { ChatOutlined, FavoriteBorderOutlined } from '@mui/icons-material'

import { PostType } from '@/entities/model'
import { cn } from '@/share/libs'
import { Divider, Tag } from '@/share/ui'

type Props = {
  post: PostType
  isDivider: boolean
  isReverse?: boolean
}

export function OnePost({ post, isDivider, isReverse = false }: Props) {
  const { title, subTitle, tags, like_count, comment_count, img_url } = post

  const reverseItem = img_url && isReverse

  return (
    <li className="flex w-full flex-col items-start justify-center gap-[18px]">
      <div className={cn('flex w-full justify-between', { 'flex-row-reverse': reverseItem })}>
        <div className={cn('flex flex-col gap-[10px]', { 'items-end': reverseItem })}>
          <div className="flex gap-1">
            {tags.map(tag => {
              {
                const { id, color, name } = tag
                return (
                  <Tag key={id} rectangle={'square'} color={color}>
                    {name}
                  </Tag>
                )
              }
            })}
          </div>
          <div className="overflow-hidden text-ellipsis text-subtitle2 text-text-primary">{title}</div>
          <div className="overflow-hidden text-ellipsis text-caption2 text-text-paragraph02">{subTitle}</div>
          <div className="flex gap-[12px] text-text-secondary">
            <div className="flex items-center">
              <FavoriteBorderOutlined className="h-5 w-5" />
              <div className="flex h-[18px] w-[18px] items-center justify-center">{like_count}</div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-[2px]">
                <ChatOutlined className="h-5 w-5" />
                <div className="flex h-[18px] w-[18px] items-center justify-center">{comment_count}</div>
              </div>
            </div>
          </div>
        </div>
        {img_url && (
          <div className="flex items-center">
            <div className="bg-grey-scale-3 h-20 w-20 rounded-[10px]" />
          </div>
        )}
      </div>
      {isDivider && <Divider thickness={'default'} width={'full'} />}
    </li>
  )
}
