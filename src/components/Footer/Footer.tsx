import React from 'react';
import { Link } from 'react-router-dom';
import Logotype from '../Logotype/Logotype';
import './Footer.css';


const Footer = () => {
  const miniMarketItems = ['Мини Маркет', 'Главная', 'Личный кабинет', 'Заказы', 'Корзина', 'Избранные товары'];
  const earnItems = [
    'Зарабатывать',
    'Стать продавцом',
    'Что продавать',
    'Стать поставщиком',
    'Стать портнёром',
    'Открыть пункт выдачи',
  ];
  const helpItems = [
    'Помощь',
    'Как оформить заказ на сайте?',
    'Какие способы оплаты доступны?',
    'Как отслеживать мой заказ?',
    'Как изменить или отменить заказ?',
    'Что делать, если я получил(а) товар с браком?',
  ];

  const renderList = (items: string[]) =>
    items.map((item, index) => (
      <li key={index} className="footer__list__item">
        <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>
          {item}
        </Link>
      </li>
    ));

  return (
    <footer className="footer" style={{ backgroundColor: '#000',  color: '#fff' }}>
      <div className="footer__container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Логотип и соцсети */}
        <div className="footer__logo-social">
          <Logotype size="small" />
        </div>

        {/* Списки */}
        <div className="footer__info" style={{ display: 'flex', gap: '24px' }}>
          <ul className="footer__list">{renderList(miniMarketItems)}</ul>
          <ul className="footer__list">{renderList(earnItems)}</ul>
          <ul className="footer__list">{renderList(helpItems)}</ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
