# Система бронирования мероприятий

Профессиональная система управления бронированием событий, разработанная с использованием современных технологий Node.js, Express, TypeScript и PostgreSQL.

## 🎯 Описание проекта

RESTful API для управления мероприятиями и бронированиями с возможностью отслеживания доступности мест в реальном времени. Архитектура проекта построена на принципах чистой архитектуры с разделением на слои: контроллеры, сервисы и модели данных.

## 🛠 Технологический стек

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: TypeORM
- **Containerization**: Docker, Docker Compose
- **Code Quality**: Prettier, ESLint (готово к добавлению)

## ✨ Ключевые возможности

### Архитектура
- ✅ Чистая архитектура с разделением ответственности
- ✅ Типизированный код на TypeScript
- ✅ Централизованная обработка ошибок
- ✅ Асинхронная обработка запросов через asyncHandler
- ✅ Валидация данных на уровне сервисов
- ✅ Docker-контейнеризация для легкого развертывания

### Функционал
- 🎫 Управление мероприятиями (CRUD операции)
- 📅 Резервирование мест с проверкой доступности
- 🔄 Автоматическое обновление количества свободных мест
- ⚠️ Защита от дублирующих бронирований
- 📊 Пагинация результатов
- 🔒 Ограничение размера выборки (защита от DoS)

## 📋 Быстрый старт

### 🐳 Запуск через Docker (рекомендуется)

```bash
# Клонировать репозиторий
git clone <repository-url>
cd booking-system

# Запустить все сервисы одной командой
docker-compose up -d

# Проверить статус
docker-compose ps

# Просмотреть логи
docker-compose logs -f app

# Остановить контейнеры
docker-compose down
```

После запуска API будет доступен на `http://localhost:3000`

### 💻 Ручная установка

```bash
# Клонировать репозиторий
git clone <repository-url>
cd booking-system

# Установить зависимости
npm install

# Настроить переменные окружения
cp .env.example .env
# Отредактировать .env файл с вашими данными

# Запустить проект в режиме разработки
npm run dev
```

### Переменные окружения

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=booking_system
```

## 🔌 API Endpoints

### Мероприятия
- `GET /api/v1/events` - Получить все мероприятия (с пагинацией)
- `GET /api/v1/events/:id` - Получить мероприятие по ID
- `POST /api/v1/events` - Создать новое мероприятие
- `PUT /api/v1/events/:id` - Обновить мероприятие
- `DELETE /api/v1/events/:id` - Удалить мероприятие
- `GET /api/v1/events/available` - Получить доступные мероприятия

### Бронирования
- `POST /api/v1/bookings/reserve` - Забронировать место
  - Тело запроса: `{ "event_id": 1, "user_id": "user123" }`
  - Ответ: `{ "success": true, "data": {...}, "message": "Booking successful" }`

### Здоровье системы
- `GET /health` - Проверка работоспособности сервера

## 📁 Структура проекта

```
booking-system/
├── src/
│   ├── app.ts                    # Конфигурация Express приложения
│   ├── server.ts                 # Точка входа сервера
│   ├── config/
│   │   └── env.config.ts         # Централизованная конфигурация
│   ├── models/                   # Модели данных TypeORM
│   │   ├── Event.ts              
│   │   └── Booking.ts            
│   ├── controllers/              # Контроллеры (обработка HTTP запросов)
│   │   ├── event.controller.ts
│   │   └── booking.controller.ts
│   ├── services/                 # Бизнес-логика
│   │   ├── event.service.ts
│   │   └── booking.service.ts
│   ├── routes/                   # Маршрутизация
│   │   ├── event.routes.ts
│   │   └── booking.routes.ts
│   ├── middlewares/              # Middleware функции
│   │   └── error.handler.ts
│   ├── utils/                    # Утилиты
│   │   ├── api.error.ts
│   │   └── async.handler.ts
│   ├── @types/                   # TypeScript определения
│   │   └── index.d.ts
│   └── database/
│       ├── database.ts
│       ├── migrations/
│       └── seeds/
├── .env.example
├── package.json
├── tsconfig.json
├── .prettierrc
└── README.md
```

## 📊 База данных

### Event
- `id` - Уникальный идентификатор
- `name` - Название мероприятия
- `total_seats` - Общее количество мест

### Booking
- `id` - Уникальный идентификатор
- `event_id` - Связь с мероприятием
- `user_id` - Идентификатор пользователя
- `created_at` - Дата создания

## 🚀 Скрипты

```bash
npm run dev              # Запуск в режиме разработки
npm run build            # Сборка для production
npm start                # Запуск production сервера
npm run format           # Форматирование кода (Prettier)
npm run format:check     # Проверка форматирования
```

## 💡 Основные особенности реализации

### Обработка ошибок
- Кастомный класс `ApiError` для типизированных ошибок
- Глобальный обработчик ошибок в middleware
- Централизованная отправка ошибок клиенту

### Безопасность и валидация
- Защита от дублирующих бронирований
- Проверка наличия свободных мест
- Валидация входных данных
- Ограничение пагинации (макс. 100 элементов)

### Качество кода
- TypeScript strict mode
- Разделение ответственности (MVC pattern)
- Комментарии на русском языке для лучшего понимания кода
- Единый стиль кода (Prettier)

## 📝 Пример использования

### Резервирование места

```bash
POST /api/v1/bookings/reserve
Content-Type: application/json

{
  "event_id": 1,
  "user_id": "user123"
}
```

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Booking successful",
  "data": {
    "id": 5,
    "event_id": 1,
    "user_id": "user123",
    "created_at": "2025-01-31T18:35:22.419Z"
  }
}
```

**Ошибка (места заняты):**
```json
{
  "success": false,
  "message": "No seats available"
}
```

## 🎓 Для чего подходит

- ⚙️ Образовательные проекты
- 📚 Портфолио разработчика
- 🏢 Тестовые задания
- 🚀 Прототипирование систем бронирования

## 📄 Лицензия

ISC License - разрешает свободное использование, изменение и распространение кода.

## 🙋‍♂️ Контакты

**Email:** otabekjon0302@gmail.com  
**Phone:** +998915566474  
**Telegram:** otabek_0302

Готов ответить на вопросы по реализации и архитектуре проекта.
