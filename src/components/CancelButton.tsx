import { Button } from 'react-bootstrap';

export default function CancelButton({ isCancelButtonRendered, cancelPostcodeSelection }) {
  if (isCancelButtonRendered) {
    return (
      <Button variant="outline-danger" onClick={cancelPostcodeSelection}>
        Cancel
      </Button>
    );
  }
  return <></>;
}
