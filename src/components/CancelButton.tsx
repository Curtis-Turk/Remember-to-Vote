import { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import { addressObject, setStateAddresses, setStateSelectedAddress } from './Postcode';

type setStateBoolean = Dispatch<SetStateAction<boolean>>;

interface cancelButtonProps {
  setIsCancelButtonRendered: setStateBoolean;
  isCancelButtonRendered: boolean;
  setIsVerifyPostcodeDisabled: setStateBoolean;
  setIsVerifyPostcodeButtonRendered: setStateBoolean;
  setIsPostcodeVerified: setStateBoolean;
  setSelectedAddress: setStateSelectedAddress;
  setAddresses: setStateAddresses;
  defaultAddressObject: addressObject;
}

export default function CancelButton({
  setIsCancelButtonRendered,
  isCancelButtonRendered,
  setIsVerifyPostcodeDisabled,
  setIsVerifyPostcodeButtonRendered,
  setIsPostcodeVerified,
  setSelectedAddress,
  setAddresses,
  defaultAddressObject,
}: cancelButtonProps) {
  if (isCancelButtonRendered) {
    const handleCancelButtonClick = (): void => {
      setIsVerifyPostcodeDisabled(false);
      setIsVerifyPostcodeButtonRendered(true);
      setIsPostcodeVerified(false);
      setIsCancelButtonRendered(false);
      setSelectedAddress(defaultAddressObject);
      setAddresses([]);
    };
    return (
      <Button id="cancel-button" variant="outline-danger" onClick={handleCancelButtonClick}>
        Cancel
      </Button>
    );
  }
  return <></>;
}
