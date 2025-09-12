import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget.jsx';
import { describe, it, expect } from 'vitest';

// Mock matchMedia for framer-motion useReducedMotion
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));

describe('ChatWidget', () => {
  it('toggles chat window', async () => {
    render(<ChatWidget />);
    const toggle = screen.getByTestId('chat-toggle');
    expect(screen.queryByTestId('chat-messages')).toBeNull();
    fireEvent.click(toggle);
    expect(screen.getByTestId('chat-messages')).toBeInTheDocument();
    fireEvent.click(toggle);
    await waitForElementToBeRemoved(() => screen.queryByTestId('chat-messages'));
    expect(screen.queryByTestId('chat-messages')).toBeNull();
  });
});
