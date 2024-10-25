import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '@/share/ui/logo'

const meta = {
  title: 'share/ui/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>

export default meta

export const Default: StoryObj<typeof Logo> = {}
