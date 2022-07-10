import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('<Button /> tests', () => {
  it('should render component with default configuration', () => {
    render(<Button>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('w-full bg-purple-500 text-body-lg')
  })

  it('should render component with secondary variant', () => {
    render(<Button variant='secondary'>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('w-full bg-purple-500 bg-opacity-10')
  })

  it('should render component with danger variant', () => {
    render(<Button variant='danger'>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-red-500')
  })

  it('should render component with large size', () => {
    render(<Button size='large'>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('rounded-3xl text-heading-md')
  })

  it('should render component with custom className', () => {
    render(<Button className='custom-class'>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('w-full bg-purple-500 text-body-lg custom-class')
  })

  it('should render component with custom type', () => {
    render(<Button type='submit'>Some children</Button>)

    const button = screen.getByText('Some children')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should call onClick handler', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Some children</Button>)

    const button = screen.getByText('Some children')

    button.click()

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
