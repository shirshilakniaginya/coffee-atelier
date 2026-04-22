export const announcement = "Бесплатная доставка на первый заказ от 2 500 ₽";

export const navigation = [
  { label: "Каталог", href: "#collection" },
  { label: "Ритуал", href: "#philosophy" },
  { label: "Контакты", href: "#contacts" },
];

export const coffeeProducts = [
  {
    id: "brazil",
    name: "Brazil Yellow Bourbon",
    origin: "Бразилия",
    roast: "Средняя обжарка",
    price: "995 ₽",
    badge: "Спокойный эспрессо-профиль",
    image: "https://coffee-people.com/thumb/2/xrO_4v99lFt9vjtXREYLuA/r800/d/kofe_braziliya_zheltyj_burbon.jpg",
    description:
      "Мягкий и понятный кофе на каждый день: плотное тело, шоколадная база и сладкое послевкусие без лишней кислотности.",
    notes: ["какао", "жёлтая карамель", "грецкий орех"],
    brewFor: ["эспрессо", "капучино", "автомат"],
    formats: ["250 г", "500 г", "1 кг"],
  },
  {
    id: "dominicana",
    name: "Dominicana Barahona AA",
    origin: "Доминикана",
    roast: "Средняя обжарка",
    price: "1 040 ₽",
    badge: "Мягкий фильтр",
    image: "https://coffee-people.com/thumb/2/uwAfsuM7J_Ibzc9WRzA2kA/r800/d/kofe_dominikana_baraona_aa.jpg",
    description:
      "Ровный, тёплый профиль с мягкой сладостью. Хорош для спокойного фильтра и для тех, кто не любит агрессивную кислотность.",
    notes: ["молочный шоколад", "тростниковый сахар", "сухофрукты"],
    brewFor: ["воронка", "капельная", "френч-пресс"],
    formats: ["250 г", "500 г"],
  },
  {
    id: "cuba",
    name: "Cuba Serrano Lavada",
    origin: "Куба",
    roast: "Средняя обжарка",
    price: "990 ₽",
    badge: "Тёмный акцент",
    image: "https://coffee-people.com/thumb/2/qHpqGGkgswWJpDZeAWzMfA/r800/d/kofe_kuba_serrano_lavada.jpg",
    description:
      "Плотный и собранный кофе для тех, кто любит глубину и шоколадную основу без резкого дыма и горечи.",
    notes: ["горький шоколад", "специи", "тёмная карамель"],
    brewFor: ["эспрессо", "турка", "френч-пресс"],
    formats: ["250 г", "500 г"],
  },
  {
    id: "irgachiffe",
    name: "Ethiopia Yirgacheffe",
    origin: "Эфиопия",
    roast: "Средняя обжарка",
    price: "935 ₽",
    badge: "Яркий фильтр",
    image: "https://coffee-people.com/thumb/2/jbi5M4RIsK4q7A_hh5NeFg/r800/d/kofe_efiopiya_irgachiffe.jpg",
    description:
      "Более воздушный и ароматный профиль с цветочным тоном. Работает, когда нужен лёгкий, чистый и собранный вкус.",
    notes: ["жасмин", "цитрус", "чёрный чай"],
    brewFor: ["воронка", "аэропресс", "батч-брю"],
    formats: ["250 г", "500 г"],
  },
  {
    id: "kaffa",
    name: "Ethiopia Kaffa",
    origin: "Эфиопия",
    roast: "Средняя обжарка",
    price: "801 ₽",
    badge: "Фруктовый профиль",
    image: "https://coffee-people.com/thumb/2/gq8lWR4NeuGIKWOEB23wgw/r800/d/kofe_efiopiya_kaffa.jpg",
    description:
      "Более сочный лот с ягодной направленностью. Даёт ощущение живого вкуса, но остаётся достаточно мягким для ежедневного ритуала.",
    notes: ["ягоды", "спелая слива", "тёмный чай"],
    brewFor: ["воронка", "кемекс", "аэропресс"],
    formats: ["250 г", "500 г"],
  },
  {
    id: "nicaragua",
    name: "Nicaragua Maragogype",
    origin: "Никарагуа",
    roast: "Средняя обжарка",
    price: "970 ₽",
    badge: "Плотный и тихий",
    image: "https://coffee-people.com/thumb/2/9BP1uWwJXRqCI33P9YhFpw/r800/d/kofe_nikaragua_maragodzhip.jpg",
    description:
      "Большое зерно, спокойный характер и десертная подача. Хороший вариант, если нужен плотный вкус без тяжести.",
    notes: ["какао", "печенье", "карамель"],
    brewFor: ["эспрессо", "турка", "гейзер"],
    formats: ["250 г", "500 г", "1 кг"],
  },
] as const;

export const storyHighlights = [
  {
    eyebrow: "Ритуал",
    title: "Кофе для состояния, а не для суеты.",
    text: "Экран не кричит скидками и лишними метриками. Он сразу показывает сам продукт, вкус и понятный выбор без визуального шума.",
    productId: "kaffa",
  },
  {
    eyebrow: "Подача",
    title: "Пакет должен жить на виду, а не прятаться в шкафу.",
    text: "Когда упаковка, фото и сетка собраны аккуратно, кофешоп ощущается как цельный бренд, а не просто каталог позиций.",
    productId: "dominicana",
  },
];

export const contacts = {
  title: "Контакты",
  subtitle: "Напиши или позвони напрямую, если нужен заказ для дома, подписка, подарочный набор или поставка в офис.",
  phone: "8 (800) 200-85-86",
  email: "hello@coffeeatelier.ru",
  address: "Московская область, г. Долгопрудный, Старое Дмитровское шоссе, д. 2, стр. 1",
  hours: "Ежедневно с 10:00 до 20:00",
};
