import { useState, Dispatch, SetStateAction } from 'react';
import { formData } from './Form';

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

  // checks postcode only has alphanumeric characters and whitespace
  const isPostcodeValid = (postcode: string): boolean => {
    return /^[A-Za-z0-9 ]*$/.test(postcode);
  };

  const verifyPostCode = async (): Promise<void> => {
    if (!isPostcodeValid(postcode)) {
      setVerifyPostcodeMessage('Please only use alphanumeric characters and spaces');
      return;
    }
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

    // TODO: implement error checking if fetch failss

    const result = (await response.json()) as pollingStationsObject;

    if (!result.pollingStationFound && !result.pollingStations.length) {
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
      setIsVerifyPostcodeButtonRendered(false);
      setAddresses(result.pollingStations);
    }
    setVerifyPostcodeMessage('');
    setIsCancelButtonRendered(true);
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
        <button id="cancel-btn" onClick={cancelPostcodeSelection}>
          Cancel
        </button>
      );
    }
  };

  const renderAddressesSelectionDiv = (): JSX.Element | undefined => {
    if (addresses.length) {
      return (
        <div>
          {/* <label htmlFor="addresses ">Select your address from the options below:</label> */}
          <select
            name="addresses"
            id="addresses"
            onChange={(event) => {
              if (event.target.value !== '') setAddress(JSON.parse(event.target.value));
            }}
          >
            <option value={''}>Select your address from the options below:</option>
            {addresses.map((addressObject) => (
              <option key={addressObject.address} value={JSON.stringify(addressObject)}>
                {addressObject.address}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // if selectedAddress object has been set
    if (selectedAddress.address.length) {
      return (
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            disabled={true}
            value={selectedAddress.address}
          />
        </div>
      );
    }
  };

  const renderVerifyPostcodeButton = (): JSX.Element | undefined => {
    let verifyPostCodeButtonText = 'Verify postcode';
    if (isVerifyPostcodeDisabled) {
      verifyPostCodeButtonText = 'Checking postcode';
    }
    if (isPostcodeVerified) {
      verifyPostCodeButtonText = 'Postcode verified!';
    }
    if (isVerifyPostcodeButtonRendered) {
      return (
        <button
          id="verify-btn"
          disabled={isVerifyPostcodeDisabled}
          className={isVerifyPostcodeDisabled ? 'verifiedPostcode' : 'unVerifiedPostcode'}
          onClick={verifyPostCode}
        >
          {verifyPostCodeButtonText}
        </button>
      );
    }
  };

  return (
    <div id="postcode">
      <label htmlFor="postcode">Postcode:</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        disabled={isVerifyPostcodeDisabled}
        onChange={handleTextChange}
      />
      {renderVerifyPostcodeButton()}
      {renderAddressesSelectionDiv()}
      {renderCancelButton()}
      {verifyPostcodeMessage.length ? <div>{verifyPostcodeMessage}</div> : null}
    </div>
  );
};
