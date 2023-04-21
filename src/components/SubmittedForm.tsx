import { SetStateAction, Dispatch } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface formProps {
  // TODO: may delete this eventually.
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

// Waiting on Joe's design thoughts.
export default function SubmittedForm({ setIsFormSubmitted }: formProps) {
  return (
    <Alert variant="success">
      <Alert.Heading>Submitted</Alert.Heading>
      <br />
      <p>
        You should receive a message shortly, confirming you will be reminded on the day of the
        election with your polling station information.
        <br />
        <br />
        You're all set!
      </p>
      {/* <hr />
      <Button
        variant="success"
        // id="submit-form-btn"
        // className="submitEnabled"
        onClick={() => setIsFormSubmitted(false)}
      >
        Back to main page
      </Button> */}
    </Alert>
  );
}
