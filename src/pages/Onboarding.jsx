import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

function Onboarding() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/login')
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-content">
        <img src="/1.png" alt="БЛИЗКО" className="onboarding-image" />

        <div className="onboarding-text">
          <p>Более 100 льгот</p>
          <p>И выгодных</p>
          <p>предложений</p>
          <p>ждут вас</p>
        </div>

        <button className="onboarding-button" onClick={handleStart}>
          Начнем!
        </button>
      </div>
    </div>
  )
}

export default Onboarding

