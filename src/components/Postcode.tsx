import { useState, Dispatch, SetStateAction } from 'react';
import { formData } from './Form';

import { Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CancelButton from './CancelButton';
import AddressSelector from './AddressSelector';

export interface addressObject {
  address: string;
  postcode: string;
  slug: string;
}

interface pollingStationsObject {
  pollingStationFound: boolean;
  pollingStations: addressObject[];
  errorMessage?: string;
}

export type setFormDataType = Dispatch<SetStateAction<formData>>;
export type setStateBoolean = Dispatch<SetStateAction<boolean>>;
export type setStateSelectedAddress = Dispatch<SetStateAction<addressObject>>;
export type setStateAddresses = Dispatch<SetStateAction<addressObject[]>>;

interface postcodeProps {
  isPostcodeVerified: boolean;
  setIsPostcodeVerified: setStateBoolean;
  setFormData: setFormDataType;
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

  const verifyPostCode = async (): Promise<void> => {
    // if (!checkValidChars(postcode)) {
    //   setPostcodeError(true);
    //   // setVerifyPostcodeMessage('Please only use alphanumeric characters and spaces');
    //   return;
    // }
    // console.log('Is this happening');

    // strip postcode of whitespace
    const strippedPostcode = postcode.replace(' ', '');

    await setIsVerifyPostcodeDisabled(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API as string}/api/postcode`, {
      method: 'POST',
      body: JSON.stringify({ postcode: strippedPostcode }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // TODO: implement error checking if fetch fails

    const result = (await response.json()) as pollingStationsObject;

    if (!result.pollingStationFound && !result.pollingStations.length) {
      setPostcodeError(true);
      switch (result.errorMessage) {
        case 'Could not geocode from any source':
          setVerifyPostcodeMessage('Postcode could not be found');
          break;
        case 'Connection issue whilst verifying postcode':
          setVerifyPostcodeMessage(result.errorMessage);
          break;
        default:
          setVerifyPostcodeMessage('There are no upcoming ballots in your area');
          break;
      }
      setIsVerifyPostcodeDisabled(false);
      return;
    }
    // on single result
    if (result.pollingStationFound) {
      // if postcode is verified, then form can be submitted.
      setIsPostcodeVerified(true);
    }

    if (result.pollingStations.length) {
      setAddresses(result.pollingStations);
    }
    setVerifyPostcodeMessage('');
    setIsCancelButtonRendered(true);
    setPostcodeError(false);
  };

  const VerifyPostcodeButton = () => {
    if (isVerifyPostcodeButtonRendered) {
      const verifyPostCodeButtonText =
        addresses.length || selectedAddress.address.length || isPostcodeVerified
          ? 'Postcode verified!'
          : 'Verify postcode';
      return (
        <Button
          id="verify-btn"
          size="lg"
          variant="outline-success"
          style={{ whiteSpace: 'nowrap' }}
          disabled={isVerifyPostcodeDisabled}
          onClick={verifyPostCode}
        >
          {verifyPostCodeButtonText}
        </Button>
      );
    }
    return <></>;
  };

  const VerifyPostcodeMessage = () => {
    if (verifyPostcodeMessage.length) {
      return <div>{verifyPostcodeMessage}</div>;
    }
    return <></>;
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
          <VerifyPostcodeButton />
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
