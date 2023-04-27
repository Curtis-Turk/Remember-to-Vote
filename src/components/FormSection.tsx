import Form from './Form';
import SubmittedForm from './SubmittedForm';

import { useState } from 'react';

export default function FormSection() {
  const [formSubmissionState, setFormSubmittedState] = useState({
    formSubmitted: false,

    numberSubmitted: '',
  });

  return (
    <div id="form-section">
      <h2 id="form-section-title">Get your reminder here</h2>
      <div id="polling-form">
        {formSubmissionState.formSubmitted ? (
          <SubmittedForm
            setFormSubmittedState={setFormSubmittedState}
            formSubmissionState={formSubmissionState}
          />
        ) : (
          <Form setFormSubmittedState={setFormSubmittedState} />
        )}
      </div>
    </div>
  );
}
