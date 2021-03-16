import Link from 'next/link'

const Button = (props) => {
  return (
    <Link href={props.link}>
      <a className='btn'>{props.children}</a>
    </Link>
  )
}

export default Button
