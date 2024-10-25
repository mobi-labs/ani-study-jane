import type { Meta, StoryObj } from '@storybook/react'

import { generatePost } from '@/entities/mock/data'
import { PostList } from '@/widget/post/post-list'

const meta = {
  title: 'widget/post/post-List',
  component: PostList,
  tags: ['autodocs'],
} satisfies Meta<typeof PostList>

export default meta

const post = generatePost(1)
const posts = generatePost(5)

export const OnePostList: StoryObj<typeof PostList> = {
  args: {
    postList: post,
  },
}

export const ManyPostList: StoryObj<typeof PostList> = {
  args: {
    postList: posts,
  },
}
