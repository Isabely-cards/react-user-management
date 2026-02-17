import type { Meta, StoryObj } from '@storybook/react-vite'
import { UsersHeader } from '.'

const meta: Meta<typeof UsersHeader> = {
  title: 'Molecules/UsersHeader',
  component: UsersHeader,
}

export default meta

type Story = StoryObj<typeof UsersHeader>

export const Default: Story = {
  args: {
    onAdd: () => alert('Add clicked'),
  },
}
