import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Sidebar } from '.'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../store/reducers/themeSlice'

// Cria um store de teste
const renderWithStore = (initialState = { theme: { darkMode: false } }) => {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: initialState,
  })

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    ),
  }
}

describe('Sidebar', () => {
  it('renderiza com Drawer aberto por padrão', () => {
    renderWithStore()
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()
    expect(screen.getByText('Modo Claro')).toBeInTheDocument()
  })

  it('fecha o Drawer ao clicar no botão de fechar', async () => {
    const { user } = renderWithStore()
    const closeButton = screen.getByText('<')
    await user.click(closeButton)

    // O botão de abrir Drawer deve aparecer
    const openButton = screen.getByLabelText(/abrir menu/i)
    expect(openButton).toBeInTheDocument()
  })

  it('abre o Drawer ao clicar no botão de abrir', async () => {
    const { user } = renderWithStore()
    // Fecha primeiro
    await user.click(screen.getByText('<'))

    // Abre novamente
    await user.click(screen.getByLabelText(/abrir menu/i))
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()
  })

  it('dispara toggleDarkMode ao clicar no ícone de tema', async () => {
    const { user, store } = renderWithStore()
    const themeButton = screen.getByLabelText(/ativar modo escuro/i)
    await user.click(themeButton)

    // Verifica se o estado mudou
    expect(store.getState().theme.darkMode).toBe(true)
  })
})