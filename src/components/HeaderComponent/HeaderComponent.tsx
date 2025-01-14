import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons'
import Logotype from '../Logotype/Logotype'
import { Input, Button } from 'antd'
import './Header.css'

const HeaderComponent = () => {
  const [showInput, setShowInput] = useState(false)

  const handleShowInput = () => {
    setShowInput(!showInput)
    const inputClass = document.querySelector('.header-input')
    const containerClass = document.querySelector('.header-container')

    if (showInput) {
      inputClass?.classList.remove('active')
      containerClass?.classList.remove('hidden')
    } else {
      inputClass?.classList.add('active')
      containerClass?.classList.add('hidden')
    }
  }

  return (
    <>
      {/* Поиск */}
      <div
        className='header-input'
        style={{
          position: 'fixed',
          width: '80%',
          top: showInput ? '20px' : '-50px',
          zIndex: 1,
          transition: '1s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Input.Search size='large' />
        <Button style={{ padding: '2px 5px' }} onClick={handleShowInput}>
          <CloseOutlined style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.5)' }} />
        </Button>
      </div>

      {/* Хедер */}
      <header
        className='header'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        {/* Левая часть */}
        <div className='header__left-side'>
          <Logotype size='small' />
        </div>

        {/* Навигация */}
        <nav className='navigation'>
          <ul className='navigation-list' style={{ display: 'flex', gap: '16px', listStyleType: 'none' }}>
            <li>
              <SearchOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleShowInput} />
            </li>

            <li>
              <Link to='/profile'>
                <UserOutlined style={{ fontSize: '24px', color: 'black' }} />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default HeaderComponent
