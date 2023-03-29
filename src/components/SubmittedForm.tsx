import { SetStateAction, Dispatch } from 'react';

interface formProps {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

export default function SubmittedForm({ setIsFormSubmitted }: formProps) {
  return (
    <div id="polling-form">
      <h2>Submitted</h2>
      {/* <p>
    You will receive a message on the day of the election with your
    polling station information
  </p> */}
      <p>You should now receive 2 test texts</p>
      <p>
        The first will have a confirmation text example with the instructions to cancel if needed
      </p>
      <p>
        The second will have an example polling station of:
        <h4>Earlswood Social Club, 160-164 Greenway Road, Rumney.</h4>
      </p>
      <p>
        For the live version you would be messaged on the day of the election with the current
        polling station for your address.
      </p>
      <p>No details have been saved for this demo</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          id="submit-form-btn"
          className="submitEnabled"
          onClick={() => setIsFormSubmitted(false)}
        >
          Back to main page
        </button>
      </div>
    </div>
  );
}
