import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { UsersSearch } from '.'

const meta: Meta<typeof UsersSearch> = {
  title: 'Components/UsersSearch',
  component: UsersSearch,
}

export default meta
type Story = StoryObj<typeof UsersSearch>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return <UsersSearch value={value} onChange={setValue} />
  },
}
