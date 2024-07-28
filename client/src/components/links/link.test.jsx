import { expect, test, describe } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Link from './link';


const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Info = () => <div>Info Page</div>;
const Error = () => <div>No Page</div>

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid='location-display'>{location.pathname}</div>
}

const Content = ({children}) => {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/info" element={<Info />}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="*" element={<Error />}/>
            </Routes>
            <LocationDisplay />
            { children }
        </MemoryRouter>
    );
}

const testOne = ({underline}) => {
    render(
        <Content>
            <Link data-testid="link-underline" href="/about" underline={underline}>Go to About</Link>
        </Content>
    );

    // Simulate click event on the link
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');
    fireEvent.click(screen.getByTestId('link-underline'));

    // Wait for the new route to be rendered
    expect(screen.getByTestId('location-display')).toHaveTextContent('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument();
}

const testTwo = ({underline}) => {
    render(
        <Content>
            <Link data-testid="link-underline" href="/" underline={underline}></Link>
        </Content>,
    );

    //make sure we are on the home page.
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    const linkUnderline = screen.getByTestId("link-underline");
    fireEvent.click(linkUnderline);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
}

const testThree = ({underline}) => {
    render(
        <Content>
            <Link data-testid="link-underline" href="/infodsad" underline={underline}>Link</Link>
        </Content>,
    );

    // Make sure we are on the home page
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    const linkUnderline = screen.getByTestId("link-underline");

    // Simulate navigation
    fireEvent.click(linkUnderline);

    // Check if the navigation to a non-existent page results in "No Page"
    expect(screen.getByText('No Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/infodsad");
}

const testFour = ({underline}) => {
    render(
        <Content>
            <Link data-testid="link-underline" href="/info" underline={underline}>Link</Link>
            <Link data-testid="link-underline-two" href="/about" underline={underline}>Link Two</Link>
        </Content>
    );

    // Make sure we are on the home page
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    const linkUnderline = screen.getByTestId("link-underline");

    //navigate to info page
    fireEvent.click(linkUnderline)
    expect(screen.getByText('Info Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/info");

    //navigate to about page
    const linkTwo = screen.getByTestId("link-underline-two");
    fireEvent.click(linkTwo);
    expect(screen.getByText('About Page')).toBeInTheDocument();
    expect(screen.getByTestId("location-display")).toHaveTextContent("/about");
}

describe("Link Component Tests", () => {
    test('Navigate from Home Page to About Page - Underline', async () => {
        testOne(true);
    });
    
    test('Navigate from Home Page to About Page - No Underline', async () => {    
        testOne(false);
    });
    
    test("Navigate to No Page - No Underline", () => {
        testTwo(false)
    });

    test("Navigate to No Page - Underline", () => {
        testTwo(true)
    });
    
    test("Faulty Navigation - No Underline", () => {
        testThree(false);
    });
    
    test("Faulty Navigation - Underline", () => {
        testThree(true);
    });
    
    test("Navigate from Home Page to Info Page to About Page - Underline", () => {
        testFour(true);
    });
    
    test("Navigate from Home Page to Info Page to About Page - No Underline", () => {
        testFour(false);
    });
});
