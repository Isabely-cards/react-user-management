import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteUserDialog } from './index'
import { fn } from 'storybook/test'

const meta: Meta<typeof DeleteUserDialog> = {
  title: 'Molecules/DeleteUserDialog',
  component: DeleteUserDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DeleteUserDialog>

export const Default: Story = {
  args: {
    open: true,
    userName: 'Isabelly Cardoso',
    onCancel: fn(),
    onConfirm: fn(),
  },
}
