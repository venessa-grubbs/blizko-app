import React, { useState } from 'react'
import './Assistant.css'

const starterMessages = [
  {
    role: 'assistant',
    text: 'Здравствуйте! Я прототип «ИИ-ассистента». Расскажите, что хотите найти?'
  },
  {
    role: 'user',
    text: 'Например, скидки на лекарства для пенсионеров'
  },
  {
    role: 'assistant',
    text: 'Я могу подсказать актуальные льготы и подготовить заявку. Задайте конкретный вопрос.'
  }
]

function Assistant() {
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!draft.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text: draft.trim() }])
    setDraft('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Спасибо! В реальной версии здесь был бы ответ модели. Сейчас это только макет.'
        }
      ])
    }, 400)
  }

  return (
    <div className="page assistant-page">
      <section className="page-card assistant-hero">
        <div className="pill pill--highlight">ИИ-ассистент</div>
        <h1>Mock чат</h1>
        <p>Макет для демонстрации — интеграция с моделью будет подключена позже.</p>
      </section>

      <section className="page-card assistant-chat">
        <div className="chat-window" aria-live="polite">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Напишите, что ищете: «льготы на ЖКХ», «соцкарта»..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit">Отправить</button>
        </form>
      </section>
    </div>
  )
}

export default Assistant

