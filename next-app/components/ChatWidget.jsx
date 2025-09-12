'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can we help?' },
  ]);
  const reduce = useReducedMotion();

  const toggle = () => setOpen((o) => !o);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    // simple auto-reply
    setTimeout(
      () =>
        setMessages((m) => [
          ...m,
          { from: 'bot', text: 'Thanks for reaching out!' },
        ]),
      300,
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={reduce ? { duration: 0 } : undefined}
            style={{
              width: 300,
              height: 400,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '0.5rem',
            }}
          >
            <div
              style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}
              data-testid="chat-messages"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: m.from === 'user' ? 'right' : 'left',
                    marginBottom: '0.25rem',
                  }}
                >
                  <span
                    style={{
                      background:
                        m.from === 'user' ? 'var(--brand-500)' : 'var(--surface)',
                      color: 'var(--text)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-block',
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              style={{ display: 'flex', borderTop: '1px solid var(--border)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '0.5rem',
                  outline: 'none',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                }}
              />
              <button type="submit" style={{ padding: '0 0.75rem' }}>
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggle}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--brand-500)',
          color: '#fff',
          cursor: 'pointer',
        }}
        data-testid="chat-toggle"
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}
