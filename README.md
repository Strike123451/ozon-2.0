# Магазин ozon2.0 (React + TypeScript + Vite)

Стек: React 18, TypeScript, Vite, Material UI, Redux Toolkit, React Router, Axios.

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
```

## Fake API
Бесплатный DummyJSON (https://dummyjson.com):
- `GET /products/category/kitchen-accessories`, `GET /products/search?q=knife` — товары
- `POST /auth/login` — авторизация (тест: `emilys` / `emilyspass`)

В DummyJSON нет отдельной категории ножей, поэтому к данным API добавлен локальный
каталог ножей `src/data/localKnives.ts` (охота, складные, кухонные, наборы, заточка).
Название магазина меняется в `src/config.ts`.

## Страницы
Каталог (поиск, фильтр по категории и цене, сортировка), карточка товара, корзина,
избранное, оформление заказа (только для авторизованных), вход, профиль.
Корзина, избранное и сессия сохраняются в localStorage.
