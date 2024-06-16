import React from 'react'
import classes from './Card.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${classes.card} ${className ? className : ''}`}>
      {children}
    </div>
  )
}

export default Card
