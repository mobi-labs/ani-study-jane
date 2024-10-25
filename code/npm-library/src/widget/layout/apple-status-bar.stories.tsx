import type { Meta, StoryObj } from '@storybook/react'

import { AppleStatusBar } from '@/widget/layout'

const meta = {
  title: 'widget/layout/apple-status-bar',
  component: AppleStatusBar,
  tags: ['autodocs'],
} satisfies Meta<typeof AppleStatusBar>

export default meta

export const Default: StoryObj<typeof AppleStatusBar> = {}
