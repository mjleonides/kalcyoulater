import { render, screen } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'

import App from './App.vue'

describe('App', () => {
  it('renders the starter heading and initial counter state', () => {
    setActivePinia(createPinia())

    render(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(screen.getByRole('heading', { name: 'CalcYouLater' })).toBeInTheDocument()
    expect(screen.getByText('Count')).toBeInTheDocument()
    expect(screen.getByText('Doubled')).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(2)
  })
})
