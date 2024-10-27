import type { Meta, StoryObj } from '@storybook/react'

import { generatePost } from '../entities/mock/data'
import { Post } from './post'
import { MobileLayout } from '../widget/layout'
import React from 'react'

const meta = {
  title: 'page/view',
  component: Post,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: Story => {
    return (
      <MobileLayout>
        <Story />
      </MobileLayout>
    )
  },
} satisfies Meta<typeof Post>

export default meta

const postList = generatePost(5)

export const Default: StoryObj<typeof Post> = {
  args: {
    postList: postList,
  },
}
