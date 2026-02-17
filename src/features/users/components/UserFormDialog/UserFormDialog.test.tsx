import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UserFormDialog, type UserFormData } from '.'

const defaultValues: UserFormData = {
  name: 'Maria',
  email: 'maria@email.com',
  status: 'ativo',
}

describe('UserFormDialog', () => {
  it('renderiza o diálogo com campos e botões', () => {
    render(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={defaultValues}
        isEditing={true}
      />,
    )

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByText(/atualizar/i)).toBeInTheDocument()
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument()
  })

  it('chama onClose ao clicar no botão cancelar', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<UserFormDialog open={true} onClose={onClose} onSubmit={vi.fn()} />)

    await user.click(screen.getByText(/cancelar/i))
    expect(onClose).toHaveBeenCalled()
  })

  it('chama onSubmit ao enviar formulário válido', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

    render(<UserFormDialog open={true} onClose={vi.fn()} onSubmit={onSubmit} />)

    await user.clear(screen.getByLabelText(/nome/i))
    await user.type(screen.getByLabelText(/nome/i), 'João')

    await user.clear(screen.getByLabelText(/email/i))
    await user.type(screen.getByLabelText(/email/i), 'joao@email.com')

    await user.click(screen.getByLabelText(/status/i))
    await user.click(screen.getByText(/inativo/i))

    await user.click(screen.getByRole('button', { name: /criar/i }))

    await waitFor(() => {
      const [formData] = onSubmit.mock.calls[0]
      expect(formData).toEqual({
        name: 'João',
        email: 'joao@email.com',
        status: 'inativo',
      })
    })
  })

  it('reseta os valores quando open muda e defaultValues é passado', async () => {
    const { rerender } = render(
      <UserFormDialog
        open={false}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: 'Maria',
          email: 'maria@email.com',
          status: 'ativo',
        }}
      />,
    )

    rerender(
      <UserFormDialog
        open={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: 'João',
          email: 'joao@email.com',
          status: 'inativo',
        }}
      />,
    )

    expect(screen.getByDisplayValue('João')).toBeInTheDocument()
    expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('inativo')).toBeInTheDocument()
  })
})
