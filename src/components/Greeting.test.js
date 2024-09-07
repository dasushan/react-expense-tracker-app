import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange (render the component that we want to test)
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert  (look into the rendered component content and check whether hello world is rendered as a text)
    const helloWorldElement = screen.getByText('Hello World'); // getByText - returns an element if it finds, throws an error if it doesnot finds an elment
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders Greet User as a button', () => {
    // Arrange
    render( <Greeting />)

    //Act
    // ....nothing

    //Assert
    const greetUserElement = screen.getByRole('button', {name: 'Greet User'});
    expect(greetUserElement).toBeInTheDocument();
  })
});
