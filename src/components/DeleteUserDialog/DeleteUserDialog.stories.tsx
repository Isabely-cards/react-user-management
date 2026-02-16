import type { Meta, StoryObj } from '@storybook/react'
import { DeleteUserDialog } from './index'

const meta: Meta<typeof DeleteUserDialog> = {
  title: 'Components/DeleteUserDialog',
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
    onCancel: () => alert('Cancelado'),
    onConfirm: async () => alert('Confirmado'),
  },
}
