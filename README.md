# TravelTrucks — Онлайн-платформа оренди кемперів та вантажівок

TravelTrucks — це сучасний вебзастосунок для компанії TravelTrucks, яка займається прокатом вантажних автомобілів та комфортабельних кемперів для подорожей.

## Короткий опис

Застосунок дозволяє користувачам переглядати каталог доступних для оренди кемперів, фільтрувати їх за різними технічними критеріями, переглядати детальну інформацію про кожен транспортний засіб з відгуками та галереєю, а також бронювати авто на потрібні дати.

## 🌟 Основні функції застосунку

### 1. Домашня сторінка (`/`)

- **Головний банер**: Привабливий інтерфейс із чітким закликом до дії (Call to Action).
- **Навігація**: Швидкий перехід до каталогу за допомогою кнопки "View Now".

### 2. Сторінка каталогу (`/catalog`)

МАРШРУТ АПІ (`/campers`)
МАРШРУТ АПІ (`/campers/filters`)

- **Серверна фільтрація**: Повноцінна фільтрація автомобілів на бекенді через API query-параметри (локація, тип кузова, тип двигуна, тип трансмісії),
    маршрут (/campers/filters ).
- **Динамічна пагінація**: Реалізовано нескінченне завантаження (Load More) по 4 картки за раз за допомогою технології TanStack Query (`useInfiniteQuery`).
- **Ізоляція вікон**: Кнопка "Show more" на картці автомобіля відкриває детальну сторінку кемпера в окремій вкладці браузера (`target="_blank"`), зберігаючи стан фільтрів у поточному вікні.
- **Менеджер станів каталогу**: При отриманні порожнього результату від сервера компонент відображає фірмову заглушку "No campers found" та забезпечує динамічне скидання параметрів і перезапуск запиту за допомогою інтерактивних кнопок "Clear filters" та "View all campers".

### 3. Сторінка деталей кемпера (`/catalog/[camperId]`)

МАРШРУТ АПІ (`/campers/{camperId}`)

- **Інформаційний блок**: Повна технічна специфікація транспортного засобу (габарити, об'єм бака, витрата палива).
- **Інтерактивна галерея**: Циклічний слайдер зображень (Thumbs Gallery Loop) на базі бібліотеки Swiper.
- **Відгуки користувачів**: Відображення реальних текстових відгуків клієнтів із візуальною п'ятизірковою шкалою рейтингу.
- **Форма бронювання**: Вбудована інтерактивна форма з живою валідацією обов'язкових полів (Name, Email) та відправкою POST-запиту на сервер із миттєвим сповіщенням про успіх.

### 4. Глобальна обробка помилок навігації

- **Сторінка Not Found**: Інтегровано системний обробник `not-found.tsx` для автоматичного перехоплення помилкових або неіснуючих URL-маршрутів усередині архітектури Next.js App Router.

## 🛠️ Технологічний стек

- **Фреймворк**: Next.js 15+ (App Router)
- **Мова програмування**: TypeScript (+ Swagger)
- **Управління станом та сервером**: TanStack Query v5 (`useInfiniteQuery`)
- **Стилізація**: Чисті CSS Modules (`*.module.css`) на базі оригінальних констант та палітри кольорів із Figma
- **Слайдер**: Swiper.js (Компоненти React)
- **Іконки**: React Icons
- **Базовий URL API**: https://campers-api.goit.study

## 📁 Структура проєкту

```

travel-trucks/
├── app/                              # Папка нативного Next.js App Router (Маршрутизація)
│   ├── catalog/                      # Сторінки, пов'язані з автомобільним каталогом
│   │   ├── [camperId]/               # Динамічний роут детальної сторінки трека по ідентифікатору (ID)
│   │   │   └── page.tsx              # Серверний компонент завантаження детальних даних кемпера та відгуків
│   │   └── page.tsx                  # Сторінка каталогу (Рендеринг списку авто, сайдбара та завантаження нових карток)
│   ├── [[...slug]]/                  # Опціональний загальний роут для головної сторінки
│   │   └── page.tsx                  # Головна сторінка сайту (Home Page) з банером та кнопкою заклику до дії
│   ├── globals.css
│   ├── layout.tsx                    # Кореневий загальний макет сайту (Шапка сайту, Провайдери, Тіло сторінки)
│   ├── loading.tsx                   # Системний компонент анімації завантаження при переході між сторінками
│   ├── not-found.module.css
│   └── not-found.tsx                 # Кастомна сторінка помилки (Сторінку не знайдено)
├── components/                       # Папка ізольованих UI-компонентів фронтенду
│   ├── CamperCard/
│   │   ├── CamperCard.module.css
│   │   └── CamperCard.tsx            # Компонент картки автомобіля у списку каталогу
│   ├── CampersFiltersSidebar/
│   │   ├── CampersFiltersSidebar.module.css
│   │   └── CampersFiltersSidebar.tsx # Сайдбар / Панель фільтрів: поле локації та класичні радіокнопки без іконок
│   ├── CampersNotFound/
│   │   ├── CampersNotFound.module.css
│   │   └── CampersNotFound.tsx       # Блок заглушки, якщо за фільтрами нічого не знайдено
│   ├── CatalogLoader/
│   │   ├── CatalogLoader.module.css
│   │   └── CatalogLoader.tsx         # Перевикористовуваний компонент тексту завантаження, для головного лоадера
│   ├── CatalogPageView/
│   │   ├── CatalogPageView.module.css
│   │   └── CatalogPageView.tsx       # Клієнтський контейнер, що об'єднує сайдбар фільтрів та нескінченний список карток
│   ├── HomePageView/
│   │   ├── HomePageView.module.css
│   │   └── HomePageView.tsx          # Контент головної сторінки: заголовки, описи та стартова кнопка переходу в каталог
│   ├── IdCamperBookingForm/
│   │   ├── IdCamperBookingForm.module.css
│   │   └── IdCamperBookingForm.tsx   # Форма бронювання та валідації з двома обов'язковими полями Ім'я та Електронна пошта
│   ├── IdCamperPageView/
│   │   ├── IdCamperPageView.module.css
│   │   └── IdCamperPageView.tsx      # Головна сторінка кемпера по ID, об'єднує слайдер, опис, таблицю, форму (4 блоки)
│   ├── IdCamperReviews/
│   │   ├── IdCamperReviews.module.css
│   │   └── IdCamperReviews.tsx       # Безпечно перевіряє масив, малює першу літеру імені в колі та ряд зірок зі спрайту
│   ├── IdImageSlider/
│   │   ├── IdImageSlider.module.css
│   │   └── IdImageSlider.tsx         # Галерея зображень: великий слайдер та чотири мініатюри з червоним бігунком прокручування
│   ├── IdVehicleTable/
│   │   ├── IdVehicleTable.module.css
│   │   └── IdVehicleTable.tsx        # Таблиця обладнання та технічних характеристик, Виводить текстовий ряд
│   ├── NavigationHeader/
│   │   ├── NavigationHeader.module.css
│   │   └── NavigationHeader.tsx      # Головне навігаційне меню сайту (Шапка сайту)
│   ├── Providers/
│   │   └── TanStackProvider.tsx      # Конфігурація та активація клієнтського провайдера для запитів TanStack Query
│   └── StarRating/
│       ├── StarRating.module.css
│       └── StarRating.tsx            # Компонент автоматичного відображення дробового рейтингу
├── constants/
│   └── environment.ts                # Зберігає константу базової адреси сервера для запитів до бекенду
├── public/
│   ├── image/
│   │   ├── Hero-2x.jpg               # Фонове зображення банера високої чіткості для екранів високої роздільної здатності
│   │   ├── Hero.jpg                  # Стандартне фонове зображення головного банера сторінки
│   │   └── no-campers-found.png      # Картинка для порожнього каталогу
│   ├── caravan-camping.svg           # Декоративна іконка для інтерфейсу
│   └── sprite.svg                    # Іконки, SVG спрайт проєкту
├── types/                            # Папка суворої типізації TypeScript
│   └── campers.ts                    # Інтерфейси моделей даних з сервера без використання примусового приведення типів
└── utils/                            # Ізольовані допоміжні функції та запити до сервера
    ├── camperDetailsApi.ts           # Серверні запити детальної сторінки за ID та запит форми бронювання
    └── fetchCampersApi.ts            # Функції запитів списку каталогу з урахуванням параметрів фільтрації
```

## 🚀 Інструкція зі встановлення та запуску

### Попередні вимоги

Переконайтеся, що на вашому комп'ютері встановлено **Node.js** (рекомендовано версію 18.0.0 або новішу) та менеджер пакетів **npm**.

### 1. Клонування репозиторію:

```bash
git clone https://github.com/KiraSpace777/travel-trucks.git
cd travel-trucks
```

### 2. Встановлення залежностей:

```bash
npm install
```

### 3. Налаштування середовища (Environment Variables)

Створіть файл `.env` у кореневій папці проєкту та додайте базову адресу API:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

### 4. Запуск у режимі розробки:

```bash
npm run dev
```

Після цього відкрийте [http://localhost:3000](http://localhost:3000) у вашому браузері, щоб переглянути застосунок.

## Інформація про автора

- **Розробник**: [Anna Krochak / KiraSpace777]
- **Роль у проєкті**: FULLSTACK Developer
- **РЕПОЗИТОРІЙ**: https://github.com/KiraSpace777/travel-trucks
- **Головна сторінка додатку**: https://travel-trucks-one-blond.vercel.app/
- **Документація бекенду (API)**: [https://campers-api.goit.study/docs](https://campers-api.goit.study/docs)

# Next.js - React Framework for the Web (general information)

Used by the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.

## Create new Next.js project

```bash
npx create-next-app@latest
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
