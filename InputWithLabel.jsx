import React, { useRef, useEffect } from 'react'

function InputWithLabel({
  autoFocus,
  label,
  id,
  value,
  type,
  name,
  onChange = 'text',
  children,
}) {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <>
      <label htmlFor='' id='todoTitle' className='todotitle'>
        {children}
      </label>
      <input
        value={value}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
      ></input>
    </>
  )
}

export default InputWithLabel
