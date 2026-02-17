import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar } from '.'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { toggleDarkMode } from '../../../../store/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {},
}

export const DarkModeOn: Story = {
  decorators: [
    (Story) => {
      store.dispatch(toggleDarkMode())
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
  ],
  args: {},
}
