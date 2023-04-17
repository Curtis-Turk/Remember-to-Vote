import { Form } from './Form';
import SubmittedForm from './SubmittedForm';

import { useState } from 'react';

function FormSection() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <div id="form-section">
      {isFormSubmitted ? (
        <SubmittedForm setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
    </div>
  );
}

export default FormSection;
