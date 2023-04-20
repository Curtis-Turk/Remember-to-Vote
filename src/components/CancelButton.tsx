import { Button } from 'react-bootstrap';

export default function CancelButton({
  setIsCancelButtonRendered,
  isCancelButtonRendered,
  setIsVerifyPostcodeDisabled,
  setIsVerifyPostcodeButtonRendered,
  setIsPostCodeVerified,
  setSelectedAddress,
  setAddresses,
  defaultAddressObject,
}) {
  if (isCancelButtonRendered) {
    const handleCancelButtonClick = (): void => {
      setIsVerifyPostcodeDisabled(false);
      setIsVerifyPostcodeButtonRendered(true);
      setIsPostCodeVerified(false);
      setIsCancelButtonRendered(false);
      setSelectedAddress(defaultAddressObject);
      setAddresses([]);
    };
    return (
      <Button variant="outline-danger" onClick={handleCancelButtonClick}>
        Cancel
      </Button>
    );
  }
  return <></>;
}
