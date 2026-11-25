import type { Product } from '../types';

const img = (text: string) => `https://placehold.co/600x400/E4E3DE/1D2830?text=${encodeURIComponent(text)}`;
const k = (n: number, title: string, category: string, price: number, rating: number, brand: string, description: string): Product => ({
  id: `k-${n}`, title, category, price, rating, brand, description, stock: 5 + n,
  thumbnail: img(title), images: [img(title), img(`${title} — клинок`)],
});

export const localKnives: Product[] = [
  k(1, 'Поварской нож Chef 20 см', 'chef-knives', 89, 4.8, 'Wüsthof', 'Классический поварской нож из высокоуглеродистой нержавеющей стали, универсален для нарезки и рубки.'),
  k(2, 'Сантоку 18 см', 'chef-knives', 75, 4.7, 'Tojiro', 'Японский универсальный нож с углублениями на клинке, чтобы продукты не прилипали.'),
  k(3, 'Нож для хлеба 23 см', 'chef-knives', 45, 4.5, 'Victorinox', 'Зубчатое лезвие для хлеба и выпечки без крошек.'),
  k(4, 'Овощной нож 9 см', 'chef-knives', 25, 4.4, 'Victorinox', 'Компактный нож для чистки и мелкой нарезки.'),
  k(5, 'Охотничий нож Hunter', 'outdoor-knives', 120, 4.9, 'Morakniv', 'Фиксированный клинок, рукоять с нескользящим покрытием, чехол в комплекте.'),
  k(6, 'Складной нож Trekker', 'outdoor-knives', 60, 4.6, 'Opinel', 'Складной туристический нож с блокировкой лезвия.'),
  k(7, 'Нож для выживания Survival', 'outdoor-knives', 98, 4.5, 'Fällkniven', 'Прочный клинок для бушкрафта и кемпинга, огниво на ножнах.'),
  k(8, 'Складной карманный нож EDC', 'folding-knives', 55, 4.7, 'Spyderco', 'Лёгкий карманный нож на каждый день с клипсой.'),
  k(9, 'Дамасский складной нож', 'folding-knives', 150, 4.8, 'Boker', 'Клинок из дамасской стали, рукоять из дерева.'),
  k(10, 'Набор ножей 5 предметов', 'knife-sets', 210, 4.9, 'Zwilling', 'Набор: поварской, сантоку, универсальный, овощной и подставка.'),
  k(11, 'Точильный камень 1000/3000', 'sharpening', 35, 4.6, 'King', 'Двусторонний водный камень для заточки ножей.'),
  k(12, 'Мусат 25 см', 'sharpening', 30, 4.3, 'Wüsthof', 'Стальной мусат для правки кромки клинка.'),
];
