import { useState, Dispatch, SetStateAction } from 'react';
import { formData } from './Form';

import { Form, Row, Col, Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface addressObject {
  address: string;
  postcode: string;
  slug: string;
}

interface pollingStationsObject {
  pollingStationFound: boolean;
  pollingStations: addressObject[];
  errorMessage?: string;
}

interface props {
  isPostcodeVerified: boolean;
  setIsPostCodeVerified: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<formData>>;
  postcode: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Postcode = ({
  isPostcodeVerified,
  setIsPostCodeVerified,
  setFormData,
  postcode,
  handleTextChange,
}: props) => {
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
      setIsPostCodeVerified(true);
    }

    if (result.pollingStations.length) {
      setAddresses(result.pollingStations);
    }
    setVerifyPostcodeMessage('');
    setIsCancelButtonRendered(true);
    setPostcodeError(false);
  };

  const setAddress = (addressObject: addressObject): void => {
    /* takes an addressObject and sets the address in the form data to be the value of the object
    removes addresses from addresses array state to clear addresses from the DOM
    */
    setFormData((formData: formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    setSelectedAddress(addressObject);
    setAddresses([]);
    setIsPostCodeVerified(true);
  };

  const cancelPostcodeSelection = (): void => {
    setIsVerifyPostcodeDisabled(false);
    setIsVerifyPostcodeButtonRendered(true);
    setIsPostCodeVerified(false);
    setIsCancelButtonRendered(false);
    setSelectedAddress(defaultAddressObject);
    setAddresses([]);
  };

  const renderCancelButton = (): JSX.Element | undefined => {
    if (isCancelButtonRendered) {
      return (
        <Button variant="outline-danger" onClick={cancelPostcodeSelection}>
          Cancel
        </Button>
      );
    }
  };

  const renderAddressesSelectionDiv = (): JSX.Element | undefined => {
    // only render the address selection if the address picker is returned by API
    let addressesFormSelect;

    if (addresses.length) {
      addressesFormSelect = (
        <Form.Select
          onChange={(event) => {
            if (event.target.value !== '') setAddress(JSON.parse(event.target.value));
          }}
        >
          <option value={''}>Select your address here</option>
          {addresses.map((addressObject) => (
            <option key={addressObject.address} value={JSON.stringify(addressObject)}>
              {addressObject.address}
            </option>
          ))}
        </Form.Select>
      );
    }

    if (selectedAddress.address.length) {
      addressesFormSelect = (
        <Form.Select disabled={true}>
          <option>{selectedAddress.address}</option>
        </Form.Select>
      );
    }

    if (addresses.length || selectedAddress.address.length) {
      return (
        <Form.Group>
          <Form.Label>Address</Form.Label>
          {addressesFormSelect}
        </Form.Group>
      );
    }
  };

  const renderVerifyPostcodeButton = (): JSX.Element | undefined => {
    let verifyPostCodeButtonText = 'Verify postcode';
    if ((isVerifyPostcodeDisabled && !isPostcodeVerified) || isPostcodeVerified) {
      verifyPostCodeButtonText = 'Postcode verified!';
    }
    if (isVerifyPostcodeButtonRendered) {
      return (
        <Button
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
  };

  const verifyPostcodeMessageElement = () => {
    if (verifyPostcodeMessage.length) {
      return <div>{verifyPostcodeMessage}</div>;
    }
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
          {renderVerifyPostcodeButton()}
        </Stack>
        {verifyPostcodeMessageElement()}
      </Form.Group>
      {renderAddressesSelectionDiv()}
      {renderCancelButton()}
    </div>
  );
};
