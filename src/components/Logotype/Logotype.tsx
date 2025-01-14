import React from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../../helpers/SettingsContext'
import { IMAGE_URL } from '../../constants/constants.ts'

interface LogotypeProps {
  size: 'small' | 'medium'
}

const Logotype: React.FC<LogotypeProps> = ({ size }) => {
  const { settings } = useSettings()

  const styles = {
    small: {
      fontSize: '32px',
      lineHeight: '32px',
    },
    medium: {
      fontSize: '40px',
      lineHeight: '56px',
    },
  }

  return (
    <Link to='/' className='link'>
      <div className='logotype' style={{ display: 'flex', alignItems: 'center' }}>
        {settings.logo && <img src={`${IMAGE_URL}/${settings.logo}`} alt='Логотип' style={{ height: 50 }} />}

        <p className='logotype__name' style={styles[size]}>
          {settings.title || 'Мини Маркет'}
        </p>
      </div>
    </Link>
  )
}

export default Logotype
