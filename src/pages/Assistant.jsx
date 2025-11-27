import React, { useState } from 'react'
import { sendMessageToAI } from '../utils/aiAssistant'
import './Assistant.css'

const starterMessages = [
  {
    role: 'assistant',
    text: 'Здравствуйте! Я ИИ-ассистент. Помогу найти подходящие льготы и социальные программы. Что вас интересует?'
  }
]

function Assistant() {
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!draft.trim() || isLoading) return

    const userMessage = draft.trim()
    
    // Сохраняем текущую историю для контекста
    const currentHistory = messages.map(msg => ({
      role: msg.role,
      text: msg.text
    }))
    
    // Добавляем сообщение пользователя
    const updatedMessages = [...messages, { role: 'user', text: userMessage }]
    setMessages(updatedMessages)
    setDraft('')
    setIsLoading(true)

    try {
      // Формируем историю с новым сообщением пользователя
      const conversationHistory = [...currentHistory, { role: 'user', text: userMessage }]

      // Отправляем запрос к ИИ-агенту
      const aiResponse = await sendMessageToAI(userMessage, conversationHistory)
      
      // Добавляем ответ ассистента
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: aiResponse
        }
      ])
    } catch (error) {
      console.error('Ошибка при получении ответа от ИИ:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Извините, произошла ошибка при обработке вашего запроса. Попробуйте еще раз или обратитесь в поддержку.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page assistant-page">
      <section className="page-card assistant-hero">
        <div className="pill pill--highlight">ИИ-ассистент</div>
        <h1>Чат с ИИ-ассистентом</h1>
        <p>Задайте вопрос о льготах, субсидиях или социальных программах. Я помогу найти подходящие варианты.</p>
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
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
        {isLoading && (
          <div className="chat-loading">
            <span>ИИ-ассистент печатает...</span>
          </div>
        )}
      </section>
    </div>
  )
}

export default Assistant

