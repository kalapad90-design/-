/**
 * База данных 20 моделей ключей для мастерской в Красноярске
 * Адрес: г. Красноярск, улица Щорса, 43 (2ГИС: https://2gis.ru/krasnoyarsk/firm/70000001052644549)
 * Телефоны: +7 (963) 956-91-22, +7 (905) 970-82-04
 * Режим работы: Пн–Вс 09:00 — 20:00 (ежедневно)
 * Без системы заказа — клиенты обращаются по адресу или по телефону.
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
    image: 'images/key-01.jpg?v=5',
    price: 250,
    priceFormatted: '250 ₽',
    time: '3–5 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-02',
    code: '#02',
    name: 'Перфорированный ключ',
    category: 'Квартирные',
    image: 'images/key-02.jpg?v=5',
    price: 650,
    priceFormatted: '650 ₽',
    time: '5–10 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-03',
    code: '#03',
    name: 'Сейфовый ключ',
    category: 'Сейфовые',
    image: 'images/key-03.jpg?v=5',
    price: 950,
    priceFormatted: '950 ₽',
    time: '10–15 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-04',
    code: '#04',
    name: 'Автомобильный выкидной ключ',
    category: 'Автомобильные',
    image: 'images/key-04.jpg?v=5',
    price: 2800,
    priceFormatted: '2 800 ₽',
    time: '15–30 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-05',
    code: '#05',
    name: 'Смарт-ключ для автомобиля',
    category: 'Автомобильные',
    image: 'images/key-05.jpg?v=5',
    price: 4500,
    priceFormatted: '4 500 ₽',
    time: '20–40 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-06',
    code: '#06',
    name: 'Автомобильный ключ с чипом',
    category: 'Автомобильные',
    image: 'images/key-06.jpg?v=5',
    price: 1800,
    priceFormatted: '1 800 ₽',
    time: '15–20 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-07',
    code: '#07',
    name: 'Домофонный брелок RFID',
    category: 'Домофонные',
    image: 'images/key-07.jpg?v=5',
    price: 150,
    priceFormatted: '150 ₽',
    time: '1–2 минуты',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-08',
    code: '#08',
    name: 'Домофонный ключ Dallas (таблетка)',
    category: 'Домофонные',
    image: 'images/key-08.jpg?v=5',
    price: 190,
    priceFormatted: '190 ₽',
    time: '1–2 минуты',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-09',
    code: '#09',
    name: 'Финский ключ Abloy',
    category: 'Квартирные',
    image: 'images/key-09.jpg?v=5',
    price: 350,
    priceFormatted: '350 ₽',
    time: '5–10 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-10',
    code: '#10',
    name: 'Крестовой ключ',
    category: 'Квартирные',
    image: 'images/key-10.jpg?v=5',
    price: 400,
    priceFormatted: '400 ₽',
    time: '5–10 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-11',
    code: '#11',
    name: 'Трубчатый ключ',
    category: 'Специальные',
    image: 'images/key-11.jpg?v=5',
    price: 550,
    priceFormatted: '550 ₽',
    time: '10–15 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-12',
    code: '#12',
    name: 'Помповый сейфовый ключ',
    category: 'Сейфовые',
    image: 'images/key-12.jpg?v=5',
    price: 1200,
    priceFormatted: '1 200 ₽',
    time: '15–20 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-13',
    code: '#13',
    name: 'Смарт-карта доступа',
    category: 'Домофонные',
    image: 'images/key-13.jpg?v=5',
    price: 250,
    priceFormatted: '250 ₽',
    time: '2–3 минуты',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-14',
    code: '#14',
    name: 'Гаражный реечный ключ',
    category: 'Специальные',
    image: 'images/key-14.jpg?v=5',
    price: 650,
    priceFormatted: '650 ₽',
    time: '10–20 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-15',
    code: '#15',
    name: 'Мотоциклетный ключ',
    category: 'Автомобильные',
    image: 'images/key-15.jpg?v=5',
    price: 2200,
    priceFormatted: '2 200 ₽',
    time: '15–25 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-16',
    code: '#16',
    name: 'Сувальдный дверной ключ',
    category: 'Квартирные',
    image: 'images/key-16.jpg?v=5',
    price: 450,
    priceFormatted: '450 ₽',
    time: '5–10 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-17',
    code: '#17',
    name: 'Ключ мастер-системы',
    category: 'Квартирные',
    image: 'images/key-17.jpg?v=5',
    price: 1600,
    priceFormatted: '1 600 ₽',
    time: '15–25 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-18',
    code: '#18',
    name: 'Почтовый ключ',
    category: 'Специальные',
    image: 'images/key-18.jpg?v=5',
    price: 180,
    priceFormatted: '180 ₽',
    time: '2–3 минуты',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-19',
    code: '#19',
    name: 'Автомобильная ключ-карта',
    category: 'Автомобильные',
    image: 'images/key-19.jpg?v=5',
    price: 3800,
    priceFormatted: '3 800 ₽',
    time: '20–35 минут',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  },
  {
    id: 'key-20',
    code: '#20',
    name: 'Специальный ключ для щитков',
    category: 'Специальные',
    image: 'images/key-20.jpg?v=5',
    price: 490,
    priceFormatted: '490 ₽',
    time: 'В наличии / от 5 мин',
    address: 'г. Красноярск, ул. Щорса, 43',
    phone: '+7 (963) 956-91-22'
  }
];

if (typeof window !== 'undefined') {
  window.COMPANY_INFO = COMPANY_INFO;
  window.KEYS_CATALOG = KEYS_CATALOG;
}
