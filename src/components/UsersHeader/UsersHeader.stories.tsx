import type { Meta, StoryObj } from '@storybook/react'
import { UsersHeader } from '.'

const meta: Meta<typeof UsersHeader> = {
  title: 'Components/UsersHeader',
  component: UsersHeader,
}

export default meta

type Story = StoryObj<typeof UsersHeader>

export const Default: Story = {
  args: {
    onAdd: () => alert('Add clicked'),
  },
}