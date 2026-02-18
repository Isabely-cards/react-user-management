import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../../store/themeSlice'
import { Sidebar } from '.'

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>()
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  }
})

import { useMediaQuery } from '@mui/material'

function renderWithStore({
  isMobile = false,
  darkMode = false,
}: {
  isMobile?: boolean
  darkMode?: boolean
} = {}) {
  ;(useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
    isMobile,
  )

  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: {
      theme: { darkMode },
    },
  })

  return {
    user: userEvent.setup(),
    store,
    ...render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    ),
  }
}

describe('Sidebar - Desktop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza aberta no desktop', () => {
    renderWithStore({ isMobile: false })

    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()
    expect(screen.getByText('Modo Claro')).toBeInTheDocument()
  })

  it('mostra modo escuro quando darkMode = true', () => {
    renderWithStore({ isMobile: false, darkMode: true })

    expect(screen.getByText('Modo Escuro')).toBeInTheDocument()
  })

  it('alterna o modo escuro ao clicar no botão', async () => {
    const { user, store } = renderWithStore({
      isMobile: false,
      darkMode: false,
    })

    await user.click(screen.getByLabelText(/Ativar modo escuro/i))

    expect(store.getState().theme.darkMode).toBe(true)
  })
})

describe('Sidebar - Mobile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza botão abrir quando fechado', () => {
    renderWithStore({ isMobile: true })

    expect(screen.getByLabelText(/abrir menu/i)).toBeInTheDocument()
  })

  it('abre o drawer ao clicar em abrir menu', async () => {
    const { user } = renderWithStore({ isMobile: true })

    await user.click(screen.getByLabelText(/abrir menu/i))

    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByLabelText(/fechar menu/i)).toBeInTheDocument()
  })

  it('fecha o drawer ao clicar em fechar menu', async () => {
    const { user } = renderWithStore({ isMobile: true })

    await user.click(screen.getByLabelText(/abrir menu/i))
    await user.click(screen.getByLabelText(/fechar menu/i))

    expect(screen.getByLabelText(/abrir menu/i)).toBeInTheDocument()
  })

  it('fecha via onClose (esc)', async () => {
    const { user } = renderWithStore({ isMobile: true })

    await user.click(screen.getByLabelText(/abrir menu/i))
    await user.keyboard('{Escape}')

    expect(screen.getByLabelText(/abrir menu/i)).toBeInTheDocument()
  })
})