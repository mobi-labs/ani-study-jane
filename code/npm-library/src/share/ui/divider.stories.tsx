import type { Meta, StoryObj } from '@storybook/react'
import './divider.sass';

import { Divider } from './divider'
import React from 'react'

const meta = {
  title: 'share/ui/divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: '길이를 나타냅니다. default는 기본적으로 393px를 나타냅니다.',
      options: ['default', 'full'],
      control: { type: 'select' },
    },
    thickness: {
      description: '선의 두꺼운 정도를 나타냅니다.',
      options: ['default', 'bolder'],
      control: { type: 'select' },
    },
  },
  decorators: Story => {
    return (
      <div className="container">
        <Story />
      </div>
    )
  },
} satisfies Meta<typeof Divider>

export default meta

export const Default: StoryObj<typeof Divider> = {
  args: {
    width: 'default',
    thickness: 'default',
  },
}
