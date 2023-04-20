import { Button } from 'react-bootstrap';
import { addressObject, setStateAddresses, setStateBoolean } from './Postcode';
import { Dispatch, SetStateAction } from 'react';

interface pollingStationsObject {
  pollingStationFound: boolean;
  pollingStations: addressObject[];
  errorMessage?: string;
}

interface verifyPostcodeButtonProps {
  postcode: string;
  setIsVerifyPostcodeDisabled: setStateBoolean;
  setPostcodeError: setStateBoolean;
  setVerifyPostcodeMessage: Dispatch<SetStateAction<string>>;
  setIsPostcodeVerified: setStateBoolean;
  setAddresses: setStateAddresses;
  setIsCancelButtonRendered: setStateBoolean;
  isVerifyPostcodeButtonRendered: boolean;
  addresses: addressObject[];
  selectedAddress: addressObject;
  isVerifyPostcodeDisabled: boolean;
  isPostcodeVerified: boolean;
}

export default function VerifyPostcodeButton(props: verifyPostcodeButtonProps) {
  const {
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
  } = props;

  const verifyPostCode = async (): Promise<void> => {
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

  if (!isVerifyPostcodeButtonRendered) return <></>;
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
