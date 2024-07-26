import { expect, test } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckBoxes from './check-boxes';

const optionsOne = [{value: "Value One", checked: true}, {value: "Value Two", checked: false}];
const optionsTwo = [{value: "Value One", checked: false}, {value: "Value Two", checked: false}, {value: "Value Three", checked: false}];
const optionsThree = [{value: "Value One", checked: true}, {value: "Value Two", checked: true}, {value: "Value Three", checked: true}, {value: "Value Four", checked: true}];

test('Checkbox with two options -> one selected', () => {
    render(<CheckBoxes data-testid="checkbox" options={optionsOne} />);

    const checkbox = screen.getByTestId('checkbox');
    const labels = checkbox.querySelectorAll('label');
    expect(labels).toHaveLength(2);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass('container-chbx');
        i == 0 ? expect(labels[i]).toHaveTextContent('Value One') : expect(labels[i]).toHaveTextContent('Value Two');
        
        let inputChild = labels[i].querySelector('input');
        if (i == 0){
            expect(inputChild).toBeChecked();
            fireEvent.click(inputChild)
            expect(inputChild).not.toBeChecked();
        } else {
            expect(inputChild).not.toBeChecked();
            fireEvent.click(inputChild)
            expect(inputChild).toBeChecked();
        }
    }
});

test("CheckBox with three options -> none selected", () => {
    render(<CheckBoxes data-testid="checkbox" options={optionsTwo} />);

    const checkbox = screen.getByTestId('checkbox');
    const labels = checkbox.querySelectorAll('label');
    expect(labels).toHaveLength(3);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass('container-chbx');
        switch(i){
            case 0:
                expect(labels[i]).toHaveTextContent('Value One');
                break;
            case 1:
                expect(labels[i]).toHaveTextContent('Value Two');
                break;
            case 2:
                expect(labels[i]).toHaveTextContent('Value Three')
                break;
        }
        let inputChild = labels[i].querySelector('input');
        expect(inputChild).not.toBeChecked();
        fireEvent.click(inputChild)
        expect(inputChild).toBeChecked();
    }
});

test("CheckBox with four options -> All Selected", () => {
    render(<CheckBoxes data-testid="checkbox" options={optionsThree} />);

    const checkbox = screen.getByTestId('checkbox');
    const labels = checkbox.querySelectorAll('label');
    expect(labels).toHaveLength(4);

    for (let i = 0; i < labels.length; i++){
        expect(labels[i]).toHaveClass('container-chbx');
        switch(i){
            case 0:
                expect(labels[i]).toHaveTextContent('Value One');
                break;
            case 1:
                expect(labels[i]).toHaveTextContent('Value Two');
                break;
            case 2:
                expect(labels[i]).toHaveTextContent('Value Three')
                break;
            case 3:
                expect(labels[i]).toHaveTextContent('Value Four')
                break;
        }
        let inputChild = labels[i].querySelector('input');
        expect(inputChild).toBeChecked();
        fireEvent.click(inputChild)
        expect(inputChild).not.toBeChecked();
    }
});