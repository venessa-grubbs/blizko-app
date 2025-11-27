import benefitsData from '../data/benefits.json'

/**
 * Функция для отправки запроса к ИИ-агенту
 * Поддерживает GigaChat, OpenAI, Anthropic, или кастомный API
 * 
 * НАСТРОЙКА GIGACHAT:
 * 1. Создайте файл .env в корне проекта
 * 2. Добавьте следующие переменные:
 *    VITE_AI_PROVIDER=gigachat
 *    VITE_AI_API_KEY=ваш-api-ключ-здесь
 *    VITE_AI_API_URL=https://gigachat.devices.sberbank.ru/api/v1/chat/completions
 *    VITE_AI_MODEL=GigaChat
 * 3. Получите API ключ на https://developers.sber.ru/gigachat
 */
export async function sendMessageToAI(userMessage, conversationHistory = []) {
  // ============================================
  // НАСТРОЙКА GIGACHAT API
  // ============================================
  // ВАРИАНТ 1: Используйте переменные окружения (рекомендуется)
  // Создайте файл .env и добавьте:
  // VITE_AI_API_KEY=ваш-ключ-здесь
  // VITE_AI_API_URL=https://gigachat.devices.sberbank.ru/api/v1/chat/completions
  // VITE_AI_MODEL=GigaChat
  const API_KEY = import.meta.env.VITE_AI_API_KEY || '' // ← ВСТАВЬТЕ API КЛЮЧ GIGACHAT
  const API_URL = import.meta.env.VITE_AI_API_URL || 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions' // ← URL GIGACHAT API
  const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'GigaChat' // ← МОДЕЛЬ: GigaChat, GigaChat-Pro, GigaChat-Max
  const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'gigachat' // 'gigachat', 'openai', 'anthropic', 'custom'
  
  // ВАРИАНТ 2: Или вставьте ключ напрямую здесь (не рекомендуется для продакшена):
  // const API_KEY = 'ваш-api-ключ-здесь'

  // Если нет API ключа, используем локальную логику с данными о льготах
  if (!API_KEY) {
    return getLocalAIResponse(userMessage, conversationHistory)
  }

  try {
    // Формируем системный промпт с контекстом о льготах
    const systemPrompt = `Ты - полезный ИИ-ассистент, который помогает людям найти подходящие льготы и социальные программы.

Твоя задача:
- Помогать пользователям найти льготы по их запросу
- Отвечать на вопросы о льготах, субсидиях и социальных программах
- Предоставлять информацию о том, как получить льготы
- Быть вежливым, дружелюбным и профессиональным

Доступные категории льгот:
- Федеральные льготы (действуют по всей России)
- Региональные льготы (зависят от региона)
- Коммерческие акции и скидки от партнеров

Отвечай на русском языке, кратко и по делу.`

    // Формируем историю сообщений для контекста
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.text || msg.content
      })),
      { role: 'user', content: userMessage }
    ]

    let response

    if (AI_PROVIDER === 'gigachat') {
      // Запрос к GigaChat API
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          // Для GigaChat может потребоваться дополнительный заголовок
          // 'X-Request-ID': generateRequestId() // Раскомментируйте если нужно
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
          // Дополнительные параметры для GigaChat (при необходимости):
          // stream: false,
          // top_p: 0.9,
        })
      })
    } else if (AI_PROVIDER === 'openai') {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        })
      })
    } else if (AI_PROVIDER === 'anthropic') {
      // Для Anthropic Claude API
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: AI_MODEL || 'claude-3-haiku-20240307',
          max_tokens: 500,
          messages: messages.filter(m => m.role !== 'system'),
          system: systemPrompt
        })
      })
    } else {
      // Кастомный API endpoint
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          messages: messages,
          model: AI_MODEL
        })
      })
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const data = await response.json()

    // Извлекаем ответ в зависимости от провайдера
    let aiResponse
    if (AI_PROVIDER === 'gigachat') {
      // GigaChat возвращает ответ в формате, похожем на OpenAI
      aiResponse = data.choices?.[0]?.message?.content || 
                   data.choices?.[0]?.delta?.content ||
                   data.message?.content ||
                   'Извините, не удалось получить ответ.'
    } else if (AI_PROVIDER === 'openai') {
      aiResponse = data.choices[0]?.message?.content || 'Извините, не удалось получить ответ.'
    } else if (AI_PROVIDER === 'anthropic') {
      aiResponse = data.content[0]?.text || 'Извините, не удалось получить ответ.'
    } else {
      // Кастомный формат
      aiResponse = data.response || data.message || data.text || 'Извините, не удалось получить ответ.'
    }

    return aiResponse.trim()
  } catch (error) {
    console.error('AI API Error:', error)
    // В случае ошибки используем локальную логику
    return getLocalAIResponse(userMessage, conversationHistory)
  }
}

/**
 * Локальная логика ответов на основе данных о льготах
 * Используется как fallback или когда API ключ не настроен
 */
function getLocalAIResponse(userMessage, conversationHistory) {
  const message = userMessage.toLowerCase()
  
  // Поиск релевантных льгот по ключевым словам
  const keywords = {
    'лекарств': ['medicines', 'eapteka'],
    'жкх': ['jkx', 'zhkh'],
    'транспорт': ['transport'],
    'пенсионер': ['pensioner'],
    'инвалид': ['disabled'],
    'многодетн': ['large_family'],
    'малоимущ': ['low_income'],
    'скидк': ['discount', 'commercial'],
    'субсид': ['subsidy']
  }

  const matchedBenefits = []
  
  for (const [keyword, benefitTypes] of Object.entries(keywords)) {
    if (message.includes(keyword)) {
      const filtered = benefitsData.benefits.filter(benefit => 
        benefitTypes.some(type => 
          benefit.id.includes(type) || 
          benefit.title.toLowerCase().includes(keyword)
        )
      )
      matchedBenefits.push(...filtered)
    }
  }

  // Если нашли релевантные льготы
  if (matchedBenefits.length > 0) {
    const uniqueBenefits = [...new Map(matchedBenefits.map(b => [b.id, b])).values()]
    const topBenefit = uniqueBenefits[0]
    
    return `Я нашел для вас льготу: "${topBenefit.title}". ${topBenefit.requirements ? `Требования: ${topBenefit.requirements}. ` : ''}${topBenefit.how_to_get ? `Как получить: ${topBenefit.how_to_get}` : ''}${uniqueBenefits.length > 1 ? ` Также доступно еще ${uniqueBenefits.length - 1} похожих программ.` : ''}`
  }

  // Общие ответы
  if (message.includes('привет') || message.includes('здравств')) {
    return 'Здравствуйте! Я помогу вам найти подходящие льготы. Расскажите, что вас интересует?'
  }

  if (message.includes('помощь') || message.includes('что ты умеешь')) {
    return 'Я могу помочь вам найти льготы по различным категориям: федеральные, региональные и коммерческие акции. Также могу подсказать, как получить льготы. Задайте вопрос, например: "льготы для пенсионеров" или "скидки на лекарства".'
  }

  // Дефолтный ответ
  return 'Спасибо за ваш вопрос! Я могу помочь найти льготы по следующим темам: лекарства, ЖКХ, транспорт, льготы для пенсионеров, инвалидов, многодетных семей. Уточните, что именно вас интересует?'
}

