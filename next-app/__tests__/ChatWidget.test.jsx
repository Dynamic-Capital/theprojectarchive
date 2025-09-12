import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget.jsx';
import { describe, it, expect } from 'vitest';

// Mock matchMedia for framer-motion useReducedMotion
window.matchMedia = window.matchMedia || (() => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }));

describe('ChatWidget', () => {
  it('toggles chat window', async () => {
    render(<ChatWidget />);
    expect(screen.queryByTestId('chat-messages')).toBeNull();
    fireEvent.click(screen.getByTestId('chat-toggle'));
    await screen.findByTestId('chat-messages');
    fireEvent.click(screen.getByLabelText('Close chat'));
    await waitForElementToBeRemoved(
      () => screen.queryByTestId('chat-messages'),
      { timeout: 2000 },
    );
    expect(screen.queryByTestId('chat-messages')).toBeNull();
  });
});
