import React, { useState } from "react";
import "./UserAccount.css";

const UserAccount = () => {
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);

  const handleDeliveryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedDeliveries((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((item) => item !== value) 
    );
  };

  return (
    <div className="user-account">
      <h1 className="user-account-title">Личный кабинет</h1>

      <section className="user-section">
        <h2 className="section-title">Способ оплаты</h2>
        <div className="payment-options">
          <div className="payment-card">
            <span className="payment-logo">💳</span>
            <span className="payment-info">+4211</span>
            <span className="payment-type">МИР</span>
          </div>
          <div className="add-payment-card">
            <span className="add-logo">+</span>
            <span>Добавить карту</span>
          </div>
        </div>
      </section>

      <section className="user-section">
        <h2 className="section-title">Способ доставки</h2>
        <div className="delivery-options">
          <label className="delivery-option">
            <input
              type="checkbox"
              value="Вариант1"
              checked={selectedDeliveries.includes("Вариант1")}
              onChange={handleDeliveryChange}
            />
            Вариант1
          </label>
          <label className="delivery-option">
            <input
              type="checkbox"
              value="Вариант2"
              checked={selectedDeliveries.includes("Вариант2")}
              onChange={handleDeliveryChange}
            />
            Вариант2
          </label>
          <label className="delivery-option">
            <input
              type="checkbox"
              value="Вариант3"
              checked={selectedDeliveries.includes("Вариант3")}
              onChange={handleDeliveryChange}
            />
            Вариант3
          </label>
        </div>
      </section>
    </div>
  );
};

export default UserAccount;
