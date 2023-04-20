import { useState, Dispatch, SetStateAction } from 'react';
import { formData } from './Form';

import { Form, Stack } from 'react-bootstrap';
import CancelButton from './CancelButton';
import AddressSelector from './AddressSelector';
import VerifyPostcodeButton from './VerifyPostcodeButton';

export interface addressObject {
  address: string;
  postcode: string;
  slug: string;
}

export type setFormData = Dispatch<SetStateAction<formData>>;
export type setStateBoolean = Dispatch<SetStateAction<boolean>>;
export type setStateSelectedAddress = Dispatch<SetStateAction<addressObject>>;
export type setStateAddresses = Dispatch<SetStateAction<addressObject[]>>;

interface postcodeProps {
  isPostcodeVerified: boolean;
  setIsPostcodeVerified: setStateBoolean;
  setFormData: setFormData;
  postcode: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Postcode({
  isPostcodeVerified,
  setIsPostcodeVerified,
  setFormData,
  postcode,
  handleTextChange,
}: postcodeProps) {
  // boolean for if postcode is being checked by the Electoral Commission API
  const [isVerifyPostcodeDisabled, setIsVerifyPostcodeDisabled] = useState(false);

  const [isVerifyPostcodeButtonRendered, setIsVerifyPostcodeButtonRendered] = useState(true);

  const [postcodeError, setPostcodeError] = useState(false);

  const [verifyPostcodeMessage, setVerifyPostcodeMessage] = useState('');

  const [isCancelButtonRendered, setIsCancelButtonRendered] = useState(false);

  // array of address objects from the Electoral Commision API
  const [addresses, setAddresses] = useState<addressObject[]>([]);

  const defaultAddressObject: addressObject = {
    address: '',
    postcode: '',
    slug: '',
  };

  // object of the selected address object
  const [selectedAddress, setSelectedAddress] = useState<addressObject>(defaultAddressObject);

  // // checks postcode only has alphanumeric characters and whitespace
  // const checkValidChars = (postcode: string): boolean => {
  //   return /^[A-Za-z0-9 ]*$/.test(postcode);
  // };

  const VerifyPostcodeMessage = () => {
    if (verifyPostcodeMessage.length) {
      return <div>{verifyPostcodeMessage}</div>;
    }
    return <></>;
  };

  const verifyPostcodeButtonProps = {
    postcode,
    setIsVerifyPostcodeDisabled,
    setPostcodeError,
    setVerifyPostcodeMessage,
    setIsPostcodeVerified,
    setAddresses,
    setIsCancelButtonRendered,
    isVerifyPostcodeButtonRendered,
    addresses,
    selectedAddress,
    isVerifyPostcodeDisabled,
    isPostcodeVerified,
  };

  return (
    <div className="form-margin-bottom">
      <Form.Group
        controlId="postcode"
        className={addresses.length || selectedAddress.address.length ? 'form-margin-bottom' : ''}
      >
        <Form.Label>Postcode</Form.Label>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            placeholder="SW1A 2AA"
            type="text"
            name="postcode"
            isInvalid={postcodeError}
            disabled={isVerifyPostcodeDisabled}
            onChange={handleTextChange}
          />
          <VerifyPostcodeButton {...verifyPostcodeButtonProps} />
        </Stack>
        <VerifyPostcodeMessage />
      </Form.Group>
      <AddressSelector
        {...{
          setFormData,
          setSelectedAddress,
          setAddresses,
          setIsPostcodeVerified,
          addresses,
          selectedAddress,
        }}
      />
      <CancelButton
        {...{
          setIsCancelButtonRendered,
          isCancelButtonRendered,
          setIsVerifyPostcodeDisabled,
          setIsVerifyPostcodeButtonRendered,
          setIsPostcodeVerified,
          setSelectedAddress,
          setAddresses,
          defaultAddressObject,
        }}
      />
    </div>
  );
}
