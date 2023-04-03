import { SetStateAction, Dispatch } from 'react';

interface formProps {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

export default function SubmittedForm({ setIsFormSubmitted }: formProps) {
  return (
    <div id="polling-form">
      <h2>Submitted</h2>
      <p>
        You will receive a message on the day of the election with your polling station information
      </p>
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
