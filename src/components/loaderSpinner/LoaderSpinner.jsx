import React from 'react'
import "./LoaderSpinner.scss"
import spinner from '../../assets/spinner.gif'

function LoaderSpinner() {
  return (
    <div className='spinner'>
      <img src={spinner} alt="" />
    </div>
  )
}

export default LoaderSpinner
