# TravelTrucks — Онлайн-платформа оренди кемперів та вантажівок

TravelTrucks — це сучасний вебзастосунок для компанії TravelTrucks, яка займається прокатом вантажних автомобілів та комфортабельних кемперів для подорожей.

## Короткий опис

Застосунок дозволяє користувачам переглядати каталог доступних для оренди кемперів, фільтрувати їх за різними технічними критеріями, переглядати детальну інформацію про кожен транспортний засіб з відгуками та галереєю, а також бронювати авто на потрібні дати.

## 🌟 Основні функції застосунку

### 1. Домашня сторінка (`/`)

### 2. Сторінка каталогу (`/campers`)

### 3. Сторінка деталей кемпера (`/campers/{camperId}`)

### 4. Глобальна обробка помилок навігації

## 🛠️ Технологічний стек

- **Фреймворк**: Next.js 15+ (App Router)
- **Мова програмування**: TypeScript (+ Swagger)
- **Управління станом та сервером**: TanStack Query v5 (`useInfiniteQuery`)
- **Стилізація**: Чисті CSS Modules (`*.module.css`) на базі оригінальних констант та палітри кольорів із Figma
- **Слайдер**: Swiper.js (Компоненти React)
- **Іконки**: React Icons
- **Базовий URL API**: https://campers-api.goit.study

## 📁 Структура проєкту

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

<img alt="NextjsLogotype" data-slot="geist-logo" loading="eager" width="79" height="16" decoding="async" data-img="1" style="color:transparent" src="/_next/static/immutable/media/nextjs-logotype-light.00-_80jv8_dct.svg">

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
