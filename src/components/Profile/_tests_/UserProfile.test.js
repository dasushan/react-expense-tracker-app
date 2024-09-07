import { renderWithProviders } from "../../../utils-for-tests";
import { screen } from "@testing-library/react";
import UserProfile from "../UserProfile";

describe('UserProfile component', () => {
    test('renders "Complete Now" as a button', ()=> {
        // Arrange
        renderWithProviders(<UserProfile />)

        //Act
        //...nothing

        //Assert
        const completeNowButton = screen.getByRole('button', {name: 'Complete Now'})
        expect(completeNowButton).toBeInTheDocument();
    })

    test('renders "Log out" as a button', ()=>{
        //Arrange
        renderWithProviders(<UserProfile/>)

        //Act
        //...nothing

        //Assert
        const logoutButton = screen.getByRole('button', {name: 'Log out'})
        expect(logoutButton).toBeInTheDocument();
    })

    test('renders Verify Email Id as a button', () => {
        renderWithProviders(<UserProfile />)

        const verifyEmailId = screen.getByRole('button', {name: 'Verify Email Id'})
        expect(verifyEmailId).toBeInTheDocument();
    })

    test('renders Your profile is Incomplete as a text', () => {
        renderWithProviders(<UserProfile />)

        const notificationTextElement = screen.getByText('your profile is incomplete', {exact: false})
        expect(notificationTextElement).toBeInTheDocument();
    })

    test('renders Welcome to Expense Tracker!!! as a text', () => {
        renderWithProviders(<UserProfile />)

        const welcomeTextElement = screen.getByText('welcome to Expense Tracker', {exact: false})
        expect(welcomeTextElement).toBeInTheDocument();
    })
})