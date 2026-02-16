import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UsersSearch } from '.'

describe('UsersSearch', () => {
  it('renderiza o campo de busca', () => {
    render(<UsersSearch value="" onChange={vi.fn()} />)

    const input = screen.getByRole('textbox', {
      name: /pesquisar usuários/i,
    })

    expect(input).toBeInTheDocument()
  })

  it('chama onChange quando o usuário digita', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<UsersSearch value="" onChange={onChange} />)

    const input = screen.getByRole('textbox')

    await user.type(input, 'Maria')

    expect(onChange).toHaveBeenCalled()
  })
})