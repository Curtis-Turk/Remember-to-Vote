import Form from './Form';
import SubmittedForm from './SubmittedForm';

import { useState } from 'react';

export default function FormSection() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <div id="form-section">
      <h2 id="form-section-title">Get your reminder here</h2>
      {isFormSubmitted ? (
        <SubmittedForm setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
    </div>
  );
}
