import Link from 'next/link'

const Button = ({ link, children, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className='btn'>{children}</a>
      </Link>
    )
  } else {
    return (
      <button onClick={onClick} className='btn'>
        {children}
      </button>
    )
  }
}

export default Button
