import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategoryModal.css";

const AddCategoryModal = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    photo: null,
    icon: null,
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Category added:", category);
    navigate(-1); // Возвращение на предыдущую страницу
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Добавление категории</h2>
          <button className="modal-close" onClick={() => navigate(-1)}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">
            Название
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="modal-input"
              placeholder="Введите название категории"
            />
          </label>
          <div className="modal-files">
            <div className="file-upload">
              <label className="file-label">Фото</label>
              <div className="file-dropzone">
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/png, image/jpeg"
                  className="file-input"
                />
                <p className="file-text">
                  Выберите файл или перетащите его сюда <br />
                  JPG или PNG формат
                </p>
                <button className="file-button">Открыть файл</button>
              </div>
            </div>
            <div className="file-upload">
              <label className="file-label">Иконка</label>
              <div className="file-dropzone">
                <input
                  type="file"
                  name="icon"
                  onChange={handleChange}
                  accept="image/svg+xml, image/eps"
                  className="file-input"
                />
                <p className="file-text">
                  Выберите файл или перетащите его сюда <br />
                  SVG или EPS формат
                </p>
                <button className="file-button">Открыть файл</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-submit" onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
