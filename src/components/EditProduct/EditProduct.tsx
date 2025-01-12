import { useState } from "react";
import "./EditProduct.css"; // Подключение CSS

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "Футболка \"Светлая сторона\"",
    description: "Описание товара",
    images: [
      "../src/assets/shirt.jpg",
      "../src/assets/shirt.jpg",
      "../src/assets/shirt.jpg"

    ],
    price: "2800",
    discountedPrice: "2200",
    status: "Опубликован",
    category: "Одежда",
    article: "123456",
    isPremium: false,
  });

  const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Product saved", product);
    // Add API call to save product
  };

  const handleDelete = () => {
    console.log("Product deleted");
    // Add API call to delete product
  };

  return (
    <div className="edit-product">
      <h2 className="edit-product-title">Редактировать товар</h2>
      <div className="edit-product-container">
        <div className="edit-product-left">
          <label className="edit-product-label">
            Название
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="edit-product-input"
            />
          </label>
          <label className="edit-product-label">
            Описание
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="edit-product-textarea"
            />
          </label>
          <label className="edit-product-label">
            Медиа
            <div className="media-upload">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`product-${index}`}
                  className="media-preview"
                />
              ))}
              <input type="file" className="media-upload-input" />
            </div>
          </label>
          <div className="price-section">
            <label className="edit-product-label">
              Цена без скидки
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="edit-product-input"
              />
            </label>
            <label className="edit-product-label">
              Цена со скидкой
              <input
                type="text"
                name="discountedPrice"
                value={product.discountedPrice}
                onChange={handleChange}
                className="edit-product-input"
              />
            </label>
          </div>
        </div>

        <div className="edit-product-right">
          <label className="edit-product-label">
            Статус
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="edit-product-select"
            >
              <option value="Опубликован">Опубликован</option>
              <option value="Черновик">Черновик</option>
              <option value="В архиве">В архиве</option>
            </select>
          </label>
          <label className="edit-product-label">
            Категория
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="edit-product-select"
            >
              <option value="Одежда">Одежда</option>
              <option value="Обувь">Обувь</option>
              <option value="Аксессуары">Аксессуары</option>
            </select>
          </label>
          <label className="edit-product-label">
            Артикул
            <input
              type="text"
              name="article"
              value={product.article}
              onChange={handleChange}
              className="edit-product-input"
            />
          </label>
          <label className="edit-product-label">
            Премиум товар
            <input
              type="checkbox"
              name="isPremium"
              checked={product.isPremium}
              onChange={handleChange}
              className="edit-product-checkbox"
            />
          </label>
          <button onClick={handleSave} className="save-btn">
            Сохранить
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
