import type { Meta, StoryObj } from '@storybook/react'

import { Tag } from './tag'

const meta = {
  title: 'share/ui/tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      description: 'color 에 따라 다른 색상을 나타냅니다.',
      options: ['Grey', 'Red', 'Green', 'Blue', 'Default'],
      control: { type: 'select' },
    },
    rectangle: {
      description: '태그의 형태 (ex: 원, 사각형)를 나타냅니다. 기본적으로 둥근 형태를 나타냅니다.',
      options: ['rectangle', 'square'],
      type: 'string',
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Tag>

export default meta

export const Default: StoryObj<typeof Tag> = {
  args: {
    color: 'Grey',
    children: '태그',
  },
}
