import type { Meta, StoryObj } from '@storybook/react-vite'
import { UsersTable } from '.'
import type { User } from '../../types/User'
import { useState } from 'react'

const users: User[] = [
  { id: '1', name: 'Maria', email: 'maria@email.com', status: 'ativo' },
  { id: '2', name: 'João', email: 'joao@email.com', status: 'inativo' },
]

const meta: Meta<typeof UsersTable> = {
  title: 'Organisms/UsersTable',
  component: UsersTable,
}

export default meta
type Story = StoryObj<typeof UsersTable>

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1)
    return (
      <UsersTable
        {...args}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={5}
      />
    )
  },
  args: {
    users,
    order: 'asc',
    onSort: () => alert('Sort'),
    onEdit: (id) => alert(`Edit ${id}`),
    onDelete: (user) => alert(`Delete ${user.name}`),
  },
}
