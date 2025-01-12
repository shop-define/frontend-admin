import { useState } from "react";
import "./ProductForm.css";
import "../EditProduct/EditProduct.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    discountedPrice: "",
    status: "Опубликован",
    category: "Одежда",
    article: "",
    isPremium: false,
  });

  const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddImage = (e : any) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl],
      }) as any);
    }
  };

  const handleSubmit = () => {
    console.log("Product created", product);
    // Add API call to create a new product
  };

  const handleSaveAsDraft = () => {
    console.log("Product saved as draft", product);
    // Add API call to save product as draft
  };

  return (
    <div className="product-form">
      <h2 className="product-form-title">Добавление товара</h2>
      <div className="product-form-container">
        <div className="product-form-left">
          <label className="product-form-label">
            Название
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="product-form-input"
            />
          </label>
          <label className="product-form-label">
            Описание
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="product-form-textarea"
            />
          </label>
          <label className="product-form-label">
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
              <input
                type="file"
                className="media-upload-input"
                onChange={handleAddImage}
              />
            </div>
          </label>
          <div className="price-section">
            <label className="product-form-label">
              Цена без скидки
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="product-form-input"
              />
            </label>
            <label className="product-form-label">
              Цена со скидкой
              <input
                type="text"
                name="discountedPrice"
                value={product.discountedPrice}
                onChange={handleChange}
                className="product-form-input"
              />
            </label>
          </div>
        </div>

        <div className="product-form-right">
          <label className="product-form-label">
            Категория
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="product-form-select"
            >
              <option value="Одежда">Одежда</option>
              <option value="Обувь">Обувь</option>
              <option value="Аксессуары">Аксессуары</option>
            </select>
          </label>
          <label className="product-form-label">
            Теги
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="product-form-select"
            >
              <option value="Опубликован">Опубликован</option>
              <option value="Черновик">Черновик</option>
              <option value="В архиве">В архиве</option>
            </select>
          </label>
          <label className="product-form-label">
            Артикул
            <input
              type="text"
              name="article"
              value={product.article}
              onChange={handleChange}
              className="product-form-input"
            />
          </label>
          <label className="product-form-label">
            Премиум товар
            <input
              type="checkbox"
              name="isPremium"
              checked={product.isPremium}
              onChange={handleChange}
              className="product-form-checkbox"
            />
          </label>
          <button onClick={handleSubmit} className="save-btn">
            Опубликовать
          </button>
          <button onClick={handleSaveAsDraft} className="draft-btn">
            В черновик
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
