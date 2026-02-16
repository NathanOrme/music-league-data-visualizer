import { fireEvent, render, screen } from '@testing-library/react';

import { RadioGroup, RadioGroupItem } from '../radio-group';

describe('RadioGroup', () => {
  it('renders radio group with items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItem value="option2" id="option2" />
      </RadioGroup>,
    );

    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs).toHaveLength(2);
    expect(radioInputs[0]).toHaveAttribute('value', 'option1');
    expect(radioInputs[1]).toHaveAttribute('value', 'option2');
  });

  it('applies the same name to all radio items', () => {
    render(
      <RadioGroup name="test-group">
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItem value="option2" id="option2" />
      </RadioGroup>,
    );

    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs[0]).toHaveAttribute('name', 'test-group');
    expect(radioInputs[1]).toHaveAttribute('name', 'test-group');
  });

  it('applies correct classes to radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem
          value="option1"
          id="option1"
          className="custom-radio"
        />
      </RadioGroup>,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveClass('aspect-square');
    expect(radio).toHaveClass('h-4');
    expect(radio).toHaveClass('w-4');
    expect(radio).toHaveClass('rounded-full');
    expect(radio).toHaveClass('border');
    expect(radio).toHaveClass('border-primary');
    expect(radio).toHaveClass('text-primary');
    expect(radio).toHaveClass('focus:outline-none');
    expect(radio).toHaveClass('focus-visible:ring-2');
    expect(radio).toHaveClass('focus-visible:ring-ring');
    expect(radio).toHaveClass('focus-visible:ring-offset-2');
    expect(radio).toHaveClass('disabled:cursor-not-allowed');
    expect(radio).toHaveClass('disabled:opacity-50');
    expect(radio).toHaveClass('cursor-pointer');
    expect(radio).toHaveClass('custom-radio');
  });

  it('applies custom props to radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem
          value="option1"
          id="option1"
          data-testid="custom-radio"
          aria-label="Custom label"
        />
      </RadioGroup>,
    );

    const radio = screen.getByTestId('custom-radio');
    expect(radio).toHaveAttribute('aria-label', 'Custom label');
  });

  it('calls onValueChange when an item is checked', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup
        name="group"
        value="option1"
        onValueChange={handleChange}
      >
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItem value="option2" id="option2" />
      </RadioGroup>,
    );

    const [, option2] = screen.getAllByRole('radio');
    fireEvent.click(option2); // triggers onChange with checked=true
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('does not call onValueChange for unchecked change or when handler missing', () => {
    const handleChange = jest.fn();
    // Without handler
    render(
      <RadioGroup name="group-no-handler" value="a">
        <RadioGroupItem value="a" id="a" />
        <RadioGroupItem value="b" id="b" />
      </RadioGroup>,
    );
    const radiosNoHandler = screen.getAllByRole('radio');
    fireEvent.click(radiosNoHandler[1]);
    expect(handleChange).not.toHaveBeenCalled();

    // With handler but simulate clicking already-checked option (no value change)
    render(
      <RadioGroup
        name="group-handler"
        value="x"
        onValueChange={handleChange}
      >
        <RadioGroupItem value="x" id="x" />
        <RadioGroupItem value="y" id="y" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[0]); // clicking already-checked still fires change but value remains same
    // Our component only calls when e.target.checked === true; clicking checked keeps true but value equal
    // Depending on browser, change may not fire; we assert we did not get another call
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
});
