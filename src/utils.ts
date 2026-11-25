export const money = (n: number) => `$${n.toFixed(2)}`;

const CATEGORY_LABELS: Record<string, string> = {
  beauty: 'Красота',
  fragrances: 'Парфюмерия',
  furniture: 'Мебель',
  groceries: 'Продукты',
  'home-decoration': 'Декор для дома',
  'kitchen-accessories': 'Кухонные аксессуары',
  laptops: 'Ноутбуки',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'mobile-accessories': 'Аксессуары для телефонов',
  motorcycle: 'Мотоциклы',
  'skin-care': 'Уход за кожей',
  smartphones: 'Смартфоны',
  'sports-accessories': 'Спорттовары',
  sunglasses: 'Солнцезащитные очки',
  tablets: 'Планшеты',
  tops: 'Топы',
  vehicle: 'Транспорт',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'womens-jewellery': 'Украшения',
  'womens-shoes': 'Женская обувь',
  'womens-watches': 'Женские часы',
};

export const categoryLabel = (c: string) => {
  if (CATEGORY_LABELS[c]) return CATEGORY_LABELS[c];
  const s = c.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
};
