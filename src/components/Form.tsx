import {
  useState,
  Dispatch,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { Postcode } from './Postcode';

import { Form as BForm } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface formProps {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

export interface formData {
  name: string;
  phone: string;
  postcode: string;
  messageType: string;
  addressSlug: string;
}

export const Form = ({ setIsFormSubmitted }: formProps) => {
  // boolean for if postcode has been verified with the Electoral Commission API
  const [isPostcodeVerified, setIsPostCodeVerified] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<formData>({
    name: '',
    phone: '',
    postcode: '',
    messageType: 'WhatsApp',
    addressSlug: '',
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    if (!isNameValid && name === 'name') setIsNameValid(true);

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = (phoneNumber: any) => {
    if (phoneNumber && isPossiblePhoneNumber(phoneNumber)) {
      setIsNumberValid(true);
    } else {
      setIsNumberValid(false);
    }

    setFormData((formData) => ({
      ...formData,
      phone: phoneNumber,
    }));
  };

  const canUserSubmit = isNameValid && isNumberValid && isPostcodeVerified && !submitting;

  const handleSubmit = async () => {
    await setSubmitting(true);

    if (formData.name && formData.phone && isPostcodeVerified) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API as string}/api/submit`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        setSubmitError('Something went wrong');
      }
    }
    if (!formData.name) setIsNameValid(false);
    if (!formData.phone) setIsNumberValid(false);
    setSubmitting(false);
  };

  const phoneNumberClassName = () => {
    const invalidClass =
      isNumberValid || (!isNumberValid && formData.phone === undefined) ? '' : ' is-invalid';
    return 'form-control' + invalidClass;
  };

  return (
    <BForm>
      <div id="polling-form">
        <div id="user-details">
          <BForm.Group controlId="name">
            <BForm.Label>Name:</BForm.Label>
            <BForm.Control
              type="text"
              placeholder="a name"
              name="name"
              className={isNameValid ? '' : 'invalid'}
              onChange={handleTextChange}
            />
          </BForm.Group>

          <BForm.Group controlId="phone">
            <BForm.Label>Phone Number:</BForm.Label>
            <PhoneInput
              defaultCountry="GB"
              onChange={handlePhoneInputChange}
              numberInputProps={{ className: phoneNumberClassName() }}
            />
          </BForm.Group>

          <Postcode
            {...{
              isPostcodeVerified,
              setIsPostCodeVerified,
              postcode: formData.postcode,
              setFormData,
              handleTextChange,
            }}
          />
        </div>
        <fieldset id="message-type">
          <legend>How would you like your reminder?</legend>
          <span>
            WhatsApp
            <input
              type="radio"
              name="messageType"
              defaultChecked={true}
              id="WhatsApp"
              value="WhatsApp"
              onChange={handleTextChange}
            />
          </span>
          <span>
            SMS
            <input
              type="radio"
              name="messageType"
              id="Sms"
              value="Sms"
              onChange={handleTextChange}
            />
          </span>
        </fieldset>
        <div>
          <div className="d-grid">
            <Button
              size="lg"
              variant="success"
              style={{
                backgroundColor: '#28A745',
                borderColor: '#28A745',
                textAlign: 'left',
              }}
              onClick={handleSubmit}
              disabled={!canUserSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
          <div>{submitError ? submitError : null}</div>
        </div>
      </div>
    </BForm>
  );
};
