import type { Meta, StoryObj } from '@storybook/react'

import { generatePost } from '@/entities/mock/data'
import { OnePost } from '@/widget/post/one-post'

const post = generatePost(1)[0]

post.img_url = '이미지'

const meta = {
  title: 'widget/post/one-post',
  component: OnePost,
  tags: ['autodocs'],
  argTypes: {
    isReverse: {
      description: '좌우 반전 여부를 선택합니다.',
      type: 'boolean',
    },
    isDivider: {
      description: '아랫줄의 여부를 선택합니다.',
      type: 'boolean',
    },
  },
} satisfies Meta<typeof OnePost>

export default meta
export const Default: StoryObj<typeof OnePost> = {
  args: {
    post,
    isDivider: true,
  },
}
