/**
 * База данных 15 моделей ключей для мастерской в Красноярске
 * Адрес: г. Красноярск, улица Щорса, 43
 * Телефоны: +7 (963) 956-91-22, +7 (905) 970-82-04
 * Режим работы: Пн–Вс 09:00 — 20:00 (ежедневно)
 */

const COMPANY_INFO = {
  name: 'МАСТЕР КЛЮЧ',
  tagline: 'Мастерская по изготовлению ключей в Красноярске',
  city: 'Красноярск',
  address: 'г. Красноярск, ул. Щорса, 43',
  addressShort: 'Красноярск, ул. Щорса, 43',
  hours: 'Пн–Вс: 09:00 — 20:00 (ежедневно)',
  phones: [
    { display: '+7 (963) 956-91-22', link: 'tel:+79639569122' },
    { display: '+7 (905) 970-82-04', link: 'tel:+79059708204' }
  ],
  gisUrl: 'https://2gis.ru/krasnoyarsk/firm/70000001052644549'
};

const KEYS_CATALOG = [
  {
    id: 'key-01',
    code: '#01',
    name: 'Английский ключ',
    category: 'Квартирные',
    image: 'images/key-01.png?v=8',
    price: 250,
    priceFormatted: '250 ₽',
    time: '3–5 минут'
  },
  {
    id: 'key-02',
    code: '#02',
    name: 'Перфорированный ключ',
    category: 'Квартирные',
    image: 'images/key-02.png?v=8',
    price: 650,
    priceFormatted: '650 ₽',
    time: '5–10 минут'
  },
  {
    id: 'key-03',
    code: '#03',
    name: 'Сейфовый ключ',
    category: 'Сейфовые',
    image: 'images/key-03.png?v=8',
    price: 950,
    priceFormatted: '950 ₽',
    time: '10–15 минут'
  },
  {
    id: 'key-04',
    code: '#04',
    name: 'Автомобильный выкидной ключ',
    category: 'Автомобильные',
    image: 'images/key-04.png?v=8',
    price: 2800,
    priceFormatted: '2 800 ₽',
    time: '15–30 минут'
  },
  {
    id: 'key-05',
    code: '#05',
    name: 'Смарт-ключ для автомобиля',
    category: 'Автомобильные',
    image: 'images/key-05.png?v=8',
    price: 4500,
    priceFormatted: '4 500 ₽',
    time: '20–40 минут'
  },
  {
    id: 'key-06',
    code: '#06',
    name: 'Автомобильный ключ с чипом',
    category: 'Автомобильные',
    image: 'images/key-06.png?v=8',
    price: 1800,
    priceFormatted: '1 800 ₽',
    time: '15–20 минут'
  },
  {
    id: 'key-07',
    code: '#07',
    name: 'Домофонный брелок RFID',
    category: 'Домофонные',
    image: 'images/key-07.png?v=8',
    price: 150,
    priceFormatted: '150 ₽',
    time: '1–2 минуты'
  },
  {
    id: 'key-08',
    code: '#08',
    name: 'Домофонный ключ Dallas (таблетка)',
    category: 'Домофонные',
    image: 'images/key-08.png?v=8',
    price: 190,
    priceFormatted: '190 ₽',
    time: '1–2 минуты'
  },
  {
    id: 'key-09',
    code: '#09',
    name: 'Финский ключ Abloy',
    category: 'Квартирные',
    image: 'images/key-09.png?v=8',
    price: 350,
    priceFormatted: '350 ₽',
    time: '5–10 минут'
  },
  {
    id: 'key-10',
    code: '#10',
    name: 'Крестовой ключ',
    category: 'Квартирные',
    image: 'images/key-10.png?v=8',
    price: 400,
    priceFormatted: '400 ₽',
    time: '5–10 минут'
  },
  {
    id: 'key-11',
    code: '#11',
    name: 'Трубчатый ключ',
    category: 'Специальные',
    image: 'images/key-11.png?v=8',
    price: 550,
    priceFormatted: '550 ₽',
    time: '10–15 минут'
  },
  {
    id: 'key-12',
    code: '#12',
    name: 'Помповый сейфовый ключ',
    category: 'Сейфовые',
    image: 'images/key-12.png?v=8',
    price: 1100,
    priceFormatted: '1 100 ₽',
    time: '15–20 минут'
  },
  {
    id: 'key-13',
    code: '#13',
    name: 'Сувальдный дверной ключ',
    category: 'Квартирные',
    image: 'images/key-13.png?v=8',
    price: 750,
    priceFormatted: '750 ₽',
    time: '10–15 минут'
  },
  {
    id: 'key-14',
    code: '#14',
    name: 'Ключ Gerda',
    category: 'Квартирные',
    image: 'images/key-14.png?v=8',
    price: 850,
    priceFormatted: '850 ₽',
    time: '10–15 минут'
  },
  {
    id: 'key-15',
    code: '#15',
    name: 'Почтовый / мебельный ключ',
    category: 'Специальные',
    image: 'images/key-15.png?v=8',
    price: 200,
    priceFormatted: '200 ₽',
    time: '3–5 минут'
  }
];

if (typeof window !== 'undefined') {
  window.KEYS_CATALOG = KEYS_CATALOG;
  window.COMPANY_INFO = COMPANY_INFO;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KEYS_CATALOG, COMPANY_INFO };
}
