import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UsersTable } from '.'
import type { User } from '../../types/User'

const mockUsers: User[] = [
  { id: '1', name: 'Maria', email: 'maria@email.com', status: 'ativo' },
  { id: '2', name: 'João', email: 'joao@email.com', status: 'inativo' },
]

describe('UsersTable', () => {
  it('renderiza usuários', () => {
    render(
      <UsersTable
        users={mockUsers}
        order="asc"
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        currentPage={1}
        setCurrentPage={vi.fn()}
        pageSize={5}
      />,
    )

    expect(screen.getByText('Maria')).toBeInTheDocument()
    expect(screen.getByText('João')).toBeInTheDocument()
  })

  it('chama onEdit ao clicar no botão editar', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(
      <UsersTable
        users={mockUsers}
        order="asc"
        onSort={vi.fn()}
        onEdit={onEdit}
        onDelete={vi.fn()}
        currentPage={1}
        setCurrentPage={vi.fn()}
        pageSize={5}
      />,
    )

    const editButton = screen.getByLabelText(/Editar usuário Maria/i)
    await user.click(editButton)

    // 👀 IDs são strings agora
    expect(onEdit).toHaveBeenCalledWith('1')
  })

  it('chama onSort ao clicar no header', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()

    render(
      <UsersTable
        users={mockUsers}
        order="asc"
        onSort={onSort}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        currentPage={1}
        setCurrentPage={vi.fn()}
        pageSize={5}
      />,
    )

    await user.click(screen.getByText(/Nome/i))

    expect(onSort).toHaveBeenCalled()
  })
})