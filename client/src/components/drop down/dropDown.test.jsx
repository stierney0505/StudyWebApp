import { expect, test } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import DropDown from './drop-down';

let hint = "Choose an Option";
let text = "Choose an Option";
let optionsOne = [{value: "optionOne", text: "Option One"}, {value: "optionTwo", text: "Option Two"}, {value: "optionThree", text: "Option Three"}];
let optionsTwo = [{value: "optionOne", text: "Option One"}, {value: "optionTwo", text: "Option Two"}, {value: "optionThree", text: "Option Three"}, {value: "optionFour", text: "Option Four"}];

test("Drop Down with Three Options -> Second Option Selected", () => {

    render(<DropDown data-testid="dropDown" hint={hint} text={text} options={optionsOne}/>);
    const dropDown = screen.getByTestId("dropDown");
    const options = dropDown.querySelectorAll('option');
    expect(options).toHaveLength(4);

    for (let i = 0; i < options.length; i++){

        switch(i){
            case 0:
                expect(options[i]).toHaveValue("na");
                expect(options[i]).toHaveTextContent(hint);
                expect(options[i]).toBeDisabled();
                break;
            case 1:
                expect(options[i]).toHaveValue("optionOne");
                expect(options[i]).toHaveTextContent("Option One");
                break;
            case 2:
                expect(options[i]).toHaveValue("optionTwo");
                expect(options[i]).toHaveTextContent("Option Two");
                break;
            case 3:
                expect(options[i]).toHaveValue("optionThree");
                expect(options[i]).toHaveTextContent("Option Three");
                break;
        }
    }

    //Select Option Two
    fireEvent.change(dropDown, { target: { value: 'optionTwo' }});
    expect(dropDown.value).toBe("optionTwo");
    expect(dropDown.value).not.toBe("optionThree");

    fireEvent.change(dropDown, { target: { value: 'optionThree' }});
    expect(dropDown.value).toBe("optionThree");
    expect(dropDown.value).not.toBe("optionTwo");
});

test("Drop Down with Four Options -> Third Option Selected", () => {

    render(<DropDown data-testid="dropDown" hint={hint} text={text} options={optionsTwo}/>);
    const dropDown = screen.getByTestId("dropDown");
    const options = dropDown.querySelectorAll('option');
    expect(options).toHaveLength(5);

    for (let i = 0; i < options.length; i++){

        switch(i){
            case 0:
                expect(options[i]).toHaveValue("na");
                expect(options[i]).toHaveTextContent(hint);
                expect(options[i]).toBeDisabled();
                break;
            case 1:
                expect(options[i]).toHaveValue("optionOne");
                expect(options[i]).toHaveTextContent("Option One");
                break;
            case 2:
                expect(options[i]).toHaveValue("optionTwo");
                expect(options[i]).toHaveTextContent("Option Two");
                break;
            case 3:
                expect(options[i]).toHaveValue("optionThree");
                expect(options[i]).toHaveTextContent("Option Three");
                break;
            case 4:
                expect(options[i]).toHaveValue("optionFour");
                expect(options[i]).toHaveTextContent("Option Four");
                break;
        }
    }

    expect(dropDown.value).toBe("optionOne");

    //Select Option Three
    fireEvent.change(dropDown, { target: { value: 'optionThree' }});
    expect(dropDown.value).toBe("optionThree");
    expect(dropDown.value).not.toBe("optionFour");

    fireEvent.change(dropDown, { target: { value: 'optionOne' }});
    expect(dropDown.value).toBe("optionOne");
    expect(dropDown.value).not.toBe("optionThree");
});

