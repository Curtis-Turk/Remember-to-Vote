import { SetStateAction, Dispatch } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface formProps {
  // TODO: may delete this eventually.
  setFormSubmittedState: Dispatch<
    SetStateAction<{ formSubmitted: boolean; numberSubmitted: string }>
  >;
  formSubmissionState: {
    formSubmitted: boolean;
    numberSubmitted: string;
  };
}

// Waiting on Joe's design thoughts.
export default function SubmittedForm({ setFormSubmittedState, formSubmissionState }: formProps) {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Submitted</Alert.Heading>
        <br />
        <p>
          You should now receive a message from us, confirming that you will receive your polling
          station information on election day.
          <br />
          <br />
        </p>
        <hr />
        <p>
          {' '}
          If you don't receive a message within a few minutes, please check your details and try
          again. Your number was {formSubmissionState.numberSubmitted}
        </p>
      </Alert>
      <Button
        variant="secondary soft"
        // id="submit-form-btn"
        // className="submitEnabled"
        onClick={() => setFormSubmittedState({ formSubmitted: false, numberSubmitted: '' })}
      >
        Go Back
      </Button>
    </>
  );
}
