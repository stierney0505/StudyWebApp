import { expect, test } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import RadioButton from './radio-button';

const optionsOne = [{value: "Option One", checked: false}, {value: "Option Two", checked: false}, {value: "Option Three", checked: true}];
const optionsTwo = [{value: "Option One", checked: false}, {value: "Option Two", checked: false}, {value: "Option Three", checked: false}, {value: "Option Four", checked: false}];
const optionsThree = [{value: "Option One", checked: true}, {value: "Option Two", checked: false}];

test('Radio Buttons with three options -> Third Checked', () => {

    render(<RadioButton data-testid="radioButton" options={optionsOne}/>);

    const radioButton = screen.getByTestId("radioButton");
    const labels = radioButton.querySelectorAll('label');
    expect(labels).toHaveLength(3);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass("container");

        switch(i){
            case 0:
                expect(labels[i]).toHaveTextContent("Option One");
                break;
            case 1:
                expect(labels[i]).toHaveTextContent("Option Two");
                break;
            case 2:
                expect(labels[i]).toHaveTextContent("Option Three");
                break;
        }

        let radioButtonChild = labels[i].querySelector("input");

        if (i != 2){
            expect(radioButtonChild).not.toBeChecked();
        } else {
            expect(radioButtonChild).toBeChecked();
        }
    }

    //check middle option instead.
    let radioButtonChild = labels[1].querySelector("input");

    fireEvent.click(radioButtonChild);
    expect(radioButtonChild).toBeChecked();

    radioButtonChild = labels[2].querySelector("input")
    expect(radioButtonChild).not.toBeChecked();
});

test("Radio Buttons with Four Options -> None Checked", () => {

    render(<RadioButton data-testid="radioButton" options={optionsTwo}/>);
    const radioButton = screen.getByTestId("radioButton");
    const labels = radioButton.querySelectorAll('label');
    expect(labels).toHaveLength(4);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass("container");

        switch(i){
            case 0:
                expect(labels[i]).toHaveTextContent("Option One");
                break;
            case 1:
                expect(labels[i]).toHaveTextContent("Option Two");
                break;
            case 2:
                expect(labels[i]).toHaveTextContent("Option Three");
                break;
            case 3:
                expect(labels[i]).toHaveTextContent("Option Four");
                break;
        }

        let radioButtonChild = labels[i].querySelector("input");
        expect(radioButtonChild).not.toBeChecked();
    }

    //check an option
    let radioButtonChild = labels[3].querySelector("input");

    fireEvent.click(radioButtonChild);
    expect(radioButtonChild).toBeChecked();
});

test("Radio Buttons with Two Options -> First Checked", () => {
    render(<RadioButton data-testid="radioButton" options={optionsThree}/>);
    const radioButton = screen.getByTestId("radioButton");
    const labels = radioButton.querySelectorAll('label');
    expect(labels).toHaveLength(2);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass("container");

        switch(i){
            case 0:
                expect(labels[i]).toHaveTextContent("Option One");
                break;
            case 1:
                expect(labels[i]).toHaveTextContent("Option Two");
                break;
        }

        let radioButtonChild = labels[i].querySelector("input");
        i == 0 ? expect(radioButtonChild).toBeChecked() :  expect(radioButtonChild).not.toBeChecked()
    }

    //check the 2nd option
    let radioButtonChild = labels[1].querySelector("input");

    fireEvent.click(radioButtonChild);
    expect(radioButtonChild).toBeChecked();
 
    radioButtonChild = labels[0].querySelector("input")
    expect(radioButtonChild).not.toBeChecked();
});
