import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserList from '.'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as userService from '../../services/userService'

// mocks dos componentes filhos
vi.mock('../../components/UsersHeader', () => ({
  UsersHeader: ({ onAdd }: any) => <button onClick={onAdd}>Adicionar</button>,
}))
vi.mock('../../components/UsersSearch', () => ({
  UsersSearch: ({ value, onChange }: any) => (
    <input
      aria-label="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))
vi.mock('../../components/UsersTable', () => ({
  UsersTable: ({ users, onEdit, onDelete }: any) => (
    <div>
      {users.map((u: any) => (
        <div key={u.id}>
          <span>{u.name}</span>
          <button onClick={() => onEdit(u.id)}>Editar</button>
          <button onClick={() => onDelete(u)}>Deletar</button>
        </div>
      ))}
    </div>
  ),
}))
vi.mock('../../components/UserFormDialog', () => ({
  UserFormDialog: ({ open, onClose, onSubmit, defaultValues }: any) =>
    open ? (
      <div>
        <span>Form aberto</span>
        <button
          onClick={() =>
            onSubmit({ name: 'Teste', email: 'teste@email.com', status: 'ativo' })
          }
        >
          Submit
        </button>
        <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}))
vi.mock('../../components/DeleteUserDialog', () => ({
  DeleteUserDialog: ({ open, onCancel, onConfirm, userName }: any) =>
    open ? (
      <div>
        <span>Deletar {userName}</span>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    ) : null,
}))

// ✅ mock do react-redux
vi.mock('react-redux', () => {
  return {
    useDispatch: () => vi.fn(),
    useSelector: (selector: any) => {
      if (selector.name === 'selectUsers')
        return [{ id: 1, name: 'João', email: 'joao@email.com', status: 'ativo' }]
      if (selector.name === 'selectLoading') return false
      if (selector.name === 'selectOrder') return {}
      return undefined
    },
  }
})

// ✅ mock do userService
vi.spyOn(userService.userService, 'create').mockResolvedValue({
  id: '2',
  name: 'Teste',
  email: 'teste@email.com',
  status: 'ativo',
})
vi.spyOn(userService.userService, 'update').mockResolvedValue({
  id: '1',
  name: 'Teste',
  email: 'teste@email.com',
  status: 'ativo',
})
vi.spyOn(userService.userService, 'delete').mockResolvedValue(undefined)

describe('UserList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza lista de usuários', () => {
    render(<UserList />)
    expect(screen.getByText('João')).toBeInTheDocument()
    expect(screen.getByText('Adicionar')).toBeInTheDocument()
  })

  it('abre formulário ao clicar em adicionar', () => {
    render(<UserList />)
    fireEvent.click(screen.getByText('Adicionar'))
    expect(screen.getByText('Form aberto')).toBeInTheDocument()
  })

  it('submete formulário de criação de usuário', async () => {
    render(<UserList />)
    fireEvent.click(screen.getByText('Adicionar'))
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(userService.userService.create).toHaveBeenCalledWith({
        name: 'Teste',
        email: 'teste@email.com',
        status: 'ativo',
      })
    })
  })

  it('abre diálogo de edição', () => {
    render(<UserList />)
    fireEvent.click(screen.getByText('Editar'))
    expect(screen.getByText('Form aberto')).toBeInTheDocument()
  })

  it('abre diálogo de delete e confirma exclusão', async () => {
    render(<UserList />)
    fireEvent.click(screen.getByText('Deletar'))
    expect(screen.getByText('Deletar João')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Confirmar'))
    await waitFor(() => {
      expect(userService.userService.delete).toHaveBeenCalledWith(1)
    })
  })

  it('filtra usuários pelo search', () => {
    render(<UserList />)
    const input = screen.getByLabelText('search')
    fireEvent.change(input, { target: { value: 'não existe' } })
    expect(screen.queryByText('João')).not.toBeInTheDocument()
  })
})