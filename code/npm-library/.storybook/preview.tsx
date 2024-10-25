import type { Preview } from '@storybook/react'
import '../app/globals.css'
import '../src/share/styles/font.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: Story => (
    <div className="font-pretendard">
      <Story />
    </div>
  ),
}

export default preview
