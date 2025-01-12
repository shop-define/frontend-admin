const mockOrderDetails = {
  id: '15323',
  status: 'Получен',
  trackingNumber: 'AJ-716',
  recipient: {
    name: 'Коноплёв Роман Евгеньевич',
    address: 'Свердловская область, Екатеринбург, улица 100-летия Уральского университета, 6/4',
    phone: '+7 123 456 78 90',
    orderDate: '15.11.2024',
  },
  payment: {
    method: 'SberPay',
    itemsCount: 7,
    total: 16073,
    discount: 12073,
    finalTotal: 4000,
  },
  items: [
    {
      key: '1',
      name: 'Футболка "Светлая сторона"',
      price: '10 000 ₽',
      quantity: 1,
      image: 'https://via.placeholder.com/100', // Замените на реальный URL изображения
    },
    {
      key: '2',
      name: 'Футболка "Светлая сторона"',
      price: '10 000 ₽',
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
    // Добавьте остальные товары
  ],
};

export default mockOrderDetails;
