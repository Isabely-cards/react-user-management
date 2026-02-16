import type { Meta, StoryObj } from '@storybook/react'
import { UsersTable } from '.'
import type { User } from '../../types/User'

const users: User[] = [
  { id: '1', name: 'Maria', email: 'maria@email.com', status: 'ativo' },
  { id: '2', name: 'João', email: 'joao@email.com', status: 'inativo' },
]

const meta: Meta<typeof UsersTable> = {
  title: 'Components/UsersTable',
  component: UsersTable,
}

export default meta
type Story = StoryObj<typeof UsersTable>

export const Default: Story = {
  args: {
    users,
    order: 'asc',
    onSort: () => alert('Sort'),
    onEdit: (id) => alert(`Edit ${id}`),
    onDelete: (user) => alert(`Delete ${user.name}`),
  },
}