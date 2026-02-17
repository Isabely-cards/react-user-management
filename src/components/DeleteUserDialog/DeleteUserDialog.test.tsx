import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteUserDialog } from '.';

describe('DeleteUserDialog', () => {
  it('renderiza corretamente com nome do usuário', () => {
    render(
      <DeleteUserDialog
        open
        userName="Isabely"
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )

    expect(
      screen.getByText(/Tem certeza de que deseja excluir/i),
    ).toBeInTheDocument()

    expect(screen.getByText('Isabely')).toBeInTheDocument()
  })

  it('chama onCancel ao clicar em Cancelar', () => {
    const onCancel = vi.fn()

    render(
      <DeleteUserDialog
        open
        userName="Teste"
        onCancel={onCancel}
        onConfirm={vi.fn()}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Cancelar/i })
    )


    expect(onCancel).toHaveBeenCalled()
  })

  it('chama onConfirm ao clicar em Deletar', () => {
    const onConfirm = vi.fn()

    render(
      <DeleteUserDialog
        open
        userName="Teste"
        onCancel={vi.fn()}
        onConfirm={onConfirm}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', { name: /deletar/i })
    )

    expect(onConfirm).toHaveBeenCalled()
  })
})
