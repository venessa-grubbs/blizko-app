# Настройка ИИ-ассистента (GigaChat)

ИИ-ассистент настроен для работы с GigaChat! Вы можете использовать его с реальным API или без него.

## Вариант 1: С GigaChat API

### Шаг 1: Создайте файл `.env` в корне проекта

Создайте файл `.env` со следующим содержимым:

```env
# Для GigaChat (основной провайдер)
VITE_AI_PROVIDER=gigachat
VITE_AI_API_KEY=ваш-api-ключ-gigachat-здесь
VITE_AI_API_URL=https://gigachat.devices.sberbank.ru/api/v1/chat/completions
VITE_AI_MODEL=GigaChat

# Или для других провайдеров:
# VITE_AI_PROVIDER=openai
# VITE_AI_API_KEY=sk-your-openai-api-key-here
# VITE_AI_API_URL=https://api.openai.com/v1/chat/completions
# VITE_AI_MODEL=gpt-4o-mini

# VITE_AI_PROVIDER=anthropic
# VITE_AI_API_KEY=sk-ant-your-anthropic-api-key-here
# VITE_AI_MODEL=claude-3-haiku-20240307
```

### Шаг 2: Получите API ключ GigaChat

- **GigaChat**: Зарегистрируйтесь на [developers.sber.ru/gigachat](https://developers.sber.ru/gigachat) и получите API ключ
- Для получения доступа к API GigaChat следуйте инструкциям на официальном сайте Сбера

### Шаг 3: Перезапустите приложение

```bash
npm run dev
```

## Вариант 2: Без API ключа (локальная логика)

Если вы не указали API ключ, ассистент будет работать с локальной логикой на основе данных о льготах из `src/data/benefits.json`. Он сможет находить релевантные льготы по ключевым словам.

## Поддерживаемые провайдеры

- ✅ **GigaChat** (основной, по умолчанию) - российский ИИ от Сбера
- ✅ OpenAI (GPT-4, GPT-3.5, GPT-4o-mini)
- ✅ Anthropic (Claude 3)
- ✅ Кастомный API endpoint

## Как это работает

1. Пользователь отправляет сообщение в чат
2. Система отправляет запрос к ИИ-агенту с контекстом о льготах
3. ИИ-агент анализирует запрос и отвечает на русском языке
4. Если API недоступен, используется локальная логика поиска по ключевым словам

## Безопасность

⚠️ **Важно**: Никогда не коммитьте файл `.env` в Git! Он уже добавлен в `.gitignore`.

