import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Issues from './issues'

const mockIssues = [
  {
    id: 1,
    title: 'Login page error',
    description: 'User cannot access their account',
    priority: 'high',
    status: 'open',
    created_at: '2026-09-16T10:00:00Z',
    user_id: 'test-user',
  },
  {
    id: 2,
    title: 'Update profile',
    description: 'Profile information needs updating',
    priority: 'low',
    status: 'resolved',
    created_at: '2026-09-15T10:00:00Z',
    user_id: 'test-user',
  },
]

vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() =>
          Promise.resolve({
            data: mockIssues,
            error: null,
          }),
        ),
      })),
    })),
  },
}))

describe('Issues page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays issues returned from Supabase', async () => {
    render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText('Login page error'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Update profile'),
    ).toBeInTheDocument()
  })

  it('filters issues using search', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>,
    )

    await screen.findByText('Login page error')

    const searchInput = screen.getByPlaceholderText(
      'Search issues...',
    )

    await user.type(searchInput, 'Login')

    await waitFor(() => {
      expect(
        screen.getByText('Login page error'),
      ).toBeInTheDocument()

      expect(
        screen.queryByText('Update profile'),
      ).not.toBeInTheDocument()
    })
  })

  it('filters issues by status', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>,
    )

    await screen.findByText('Login page error')

    const statusFilter = screen.getByDisplayValue(
      'All Statuses',
    )

    await user.selectOptions(statusFilter, 'resolved')

    await waitFor(() => {
      expect(
        screen.getByText('Update profile'),
      ).toBeInTheDocument()

      expect(
        screen.queryByText('Login page error'),
      ).not.toBeInTheDocument()
    })
  })
})