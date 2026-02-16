import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UsersHeader } from '.'

describe('UsersHeader', () => {
  it('deve renderizar o título corretamente', () => {
    render(<UsersHeader onAdd={vi.fn()} />)

    const heading = screen.getByRole('heading', {
      name: /user management/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('deve chamar onAdd ao clicar no botão', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<UsersHeader onAdd={onAdd} />)

    const button = screen.getByRole('button', {
      name: /add usuário/i,
    })

    await user.click(button)

    expect(onAdd).toHaveBeenCalledTimes(1)
  })
})