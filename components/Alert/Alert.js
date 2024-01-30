import React from 'react'
const alerts = ['gg', 'ggg']
const Alert = () => {
  return alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.type}`} role='alert'>
      {alert.message}
    </div>
  ))
}

export default Alert
