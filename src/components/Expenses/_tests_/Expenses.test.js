import { render, screen } from "@testing-library/react";
import Expenses from "../Expenses";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils-for-tests";

describe('Expenses component', () => {
    test(' renders Activate Premium as a button', () => {
        //Arrange (render the component that we want to test)
        
        renderWithProviders(<Expenses />)

        //Act
        //...nothing
        
        //Assert
        const activatePremiumButton = screen.getByText('Daily Expenses');
        expect(activatePremiumButton).toBeInTheDocument();

    })
})