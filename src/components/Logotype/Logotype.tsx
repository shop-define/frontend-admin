import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg'; // Убедитесь, что путь к лого правильный

interface LogotypeProps {
  size: 'small' | 'medium';
}

const Logotype: React.FC<LogotypeProps> = ({ size }) => {
  const styles = {
    small: {
      fontSize: '32px',
      lineHeight: '32px',
    },
    medium: {
      fontSize: '40px',
      lineHeight: '56px',
    },
  };

  return (
    <Link to="/" className="link">
      <div className="logotype" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={Logo} alt="Логотип" style={{ width: 40, height: 40 }} />
        <p className="logotype__name" style={styles[size]}>
          Мини Маркет
        </p>
      </div>
    </Link>
  );
};

export default Logotype;
