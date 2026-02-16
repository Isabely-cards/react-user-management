import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserList from '../../../pages/UserList'
import type { User } from '../../../types/User'

vi.mock('../../../hooks/useUsers', () => ({
    useUsers: () => ({
        users: [
            { id: '1', name: 'Maria', email: 'maria@email.com', status: 'ativo' },
            { id: '2', name: 'João', email: 'joao@email.com', status: 'inativo' },
        ],
        setUsers: vi.fn(),
        loading: false,
        order: 'asc',
        handleSort: vi.fn(),
    }),
}))

describe('UserList', () => {
    it('renderiza lista de usuários', () => {
        render(<UserList />)

        expect(screen.getByText('Maria')).toBeInTheDocument()
        expect(screen.getByText('João')).toBeInTheDocument()
    })

    it('deve renderizar a listagem de usuários', async () => {
        render(<UserList />)

        expect(await screen.findByText('Maria')).toBeInTheDocument()
        expect(screen.getByText('João')).toBeInTheDocument()
    })

    it('deve criar um novo usuário', async () => {
        render(<UserList />)

        fireEvent.click(screen.getByRole('button', { name: /adicionar/i }))

        fireEvent.change(screen.getByLabelText(/nome/i), {
            target: { value: 'Carlos' },
        })

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'carlos@email.com' },
        })

        fireEvent.click(screen.getByRole('button', { name: /salvar/i }))

        expect(await screen.findByText('Carlos')).toBeInTheDocument()
    })

    it('filtra usuários ao digitar na busca', async () => {
        const user = userEvent.setup()

        render(<UserList />)

        const input = screen.getByRole('textbox', {
            name: /pesquisar usuários/i,
        })

        await user.type(input, 'Maria')

        expect(screen.getByText('Maria')).toBeInTheDocument()
        expect(screen.queryByText('João')).not.toBeInTheDocument()
    })

    it('abre modal ao clicar em adicionar', async () => {
        const user = userEvent.setup()

        render(<UserList />)

        await user.click(
            screen.getByRole('button', { name: /add usuário/i }),
        )

        expect(
            screen.getByRole('dialog'),
        ).toBeInTheDocument()
    })
})