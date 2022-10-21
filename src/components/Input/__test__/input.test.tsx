import { render } from '@testing-library/react-native';
import React from 'react';
import Input from '..';

const mockProps = {
  value: '',
  error: '',
  label: 'name',
  required: true,
  touched: false,
  secureTextEntry: false,
  placeholder: 'name',
  placeholderTextColor: 'blue',
  onFocus: () => {},
  onBlur: () => {},
  onChangeText: () => {},
};

describe('#WelcomeScreen', () => {
  let props = {} as any;

  beforeEach(() => {
    props = mockProps;
  });

  it('Should not render validation error at first', () => {
    const {queryByTestId} = render(<Input {...props} />);
    expect(queryByTestId('name-input-error')).toBeNull();
  });

  // it('should render [hasAFee] block on the screen', () => {
  //   props.paymentDetails.transaction.fee = 65.5;
  //   const feeLabel = `${fee} ${formatAmount(
  //     props.paymentDetails?.transaction.fee,
  //   )}`;

  //   const {getByTestId, getByText} = render(<PaymentDetails {...props} />);
  //   expect(getByTestId('has-a-fee')).toBeDefined();
  //   expect(getByText(feeLabel)).toBeDefined();
  // });

  // it('should render [last4Nos -  last 4 card number] block on the screen', () => {
  //   const cardNoLength = props.paymentDetails?.linkedCardNumber.length;
  //   const last4Nos = `${props.paymentDetails?.linkedCardNumber}`.slice(
  //     cardNoLength - 4,
  //   );
  //   const {getByText} = render(<PaymentDetails {...props} />);
  //   expect(getByText(`****${last4Nos}`)).toBeDefined();
  // });
});
