import type { Meta, StoryObj } from '@storybook/react'

import { AppBar } from '@/widget/layout/app-bar'

const meta = {
  title: 'widget/layout/app-bar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '앱바 아래 분리선을 표시할 지 결정합니다.',
      control: {
        type: 'object',
        disable: false,
      },
    },
  },
} satisfies Meta<typeof AppBar>

export default meta

export const Default: StoryObj<typeof AppBar> = {
  args: {
    children: <AppBar.DefaultContent icon={2}>홈페이지</AppBar.DefaultContent>,
  },
}

export const Chat: StoryObj<typeof AppBar> = {
  args: {
    children: (
      <AppBar.ChatContent count={10} icon={2}>
        홈페이지
      </AppBar.ChatContent>
    ),
  },
}

export const Home: StoryObj<typeof AppBar> = {
  args: {
    children: <AppBar.HomeContent icon={2} />,
  },
}
