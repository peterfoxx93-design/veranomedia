'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface ChatWidgetProps {
  apiUrl: string
  botName: string
  avatarUrl?: string
  greeting?: string
  primaryColor?: string
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export default function ChatWidget({ apiUrl, botName, avatarUrl, greeting = '¡Hola! ¿En qué puedo ayudarte?', primaryColor = '#0D9488' }: ChatWidgetProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const [channelId] = useState(() => {
    try {
      const stored = localStorage.getItem('chat_uuid')
      if (stored) return stored
    } catch {}
    const id = generateId()
    try { localStorage.setItem('chat_uuid', id) } catch {}
    return id
  })
  const chatRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setShowGreeting(false)
    setLoading(true)

    const history = messages.map(m => ({ user: m.user, bot: m.bot }))
    setMessages(prev => [...prev, { user: msg, bot: '' }])

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          history,
          channel_id: channelId,
          phone: '',
        }),
      })
      const data = await res.json()
      const reply = data.response || 'Disculpa, no pude procesar tu mensaje.'
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { user: msg, bot: reply }
        return updated
      })
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { user: msg, bot: 'Error de conexión. Intenta de nuevo.' }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send()
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ backgroundColor: primaryColor }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl text-white flex items-center justify-center z-50 hover:scale-110 transition-all duration-200 overflow-hidden"
        aria-label="Chat"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={botName} className="w-full h-full object-cover" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div style={{ backgroundColor: primaryColor }} className="text-white px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={botName} className="w-full h-full object-cover" />
          ) : (
            botName[0]
          )}
        </div>
        <div>
          <p className="font-semibold text-sm">{botName}</p>
          <p className="text-xs text-white/70">Online</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div ref={chatRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
        {showGreeting && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm text-sm text-gray-700">
              {greeting}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i}>
            <div className="flex justify-end mb-2">
              <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-sm shadow-sm">
                {m.user}
              </div>
            </div>
            {m.bot && (
              <div className="flex justify-start mb-2">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm text-gray-700 shadow-sm whitespace-pre-line">
                  {m.bot}
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-3 flex gap-2 bg-white">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-full outline-none focus:border-blue-400 transition-colors"
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{ backgroundColor: primaryColor }}
          className="w-10 h-10 rounded-full text-white flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-all shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}
