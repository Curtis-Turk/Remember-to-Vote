import { useState, Dispatch, SetStateAction } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import Postcode from './Postcode';

import { Form as BForm } from 'react-bootstrap';
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

export default function Form({ setIsFormSubmitted }: formProps) {
  // boolean for if postcode has been verified with the Electoral Commission API
  const [isPostcodeVerified, setIsPostcodeVerified] = useState(false);
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
      Sign up to be sent a reminder on election day with your polling station details for the local
      elections on 4th May, 2023.
      <br />
      <br />
      <BForm.Group className="form-margin-bottom" controlId="name">
        <BForm.Label>Name</BForm.Label>
        <BForm.Control
          type="text"
          placeholder="Jane Appleseed"
          name="name"
          className={isNameValid ? '' : 'invalid'}
          onChange={handleTextChange}
        />
      </BForm.Group>
      <BForm.Group className="form-margin-bottom" controlId="phone">
        <BForm.Label>Phone number</BForm.Label>
        <PhoneInput
          style={{ '--PhoneInputCountryFlag-height': '20px' }}
          defaultCountry="GB"
          onChange={handlePhoneInputChange}
          numberInputProps={{ className: phoneNumberClassName() }}
          placeholder="07700 900684"
        />
      </BForm.Group>
      <Postcode
        {...{
          isPostcodeVerified,
          setIsPostcodeVerified,
          postcode: formData.postcode,
          setFormData,
          handleTextChange,
        }}
      />
      <BForm.Group className="form-margin-bottom">
        <BForm.Label>How would you like your reminder?</BForm.Label>
        <BForm.Check
          inline
          label="SMS"
          name="messageType"
          type={'radio'}
          id={`inline-radio`}
          value="Sms"
          onChange={handleTextChange}
        />
        <BForm.Check
          inline
          label="WhatsApp"
          name="messageType"
          type={'radio'}
          id={`inline-radio`}
          defaultChecked={true}
          value="WhatsApp"
          onChange={handleTextChange}
        />
      </BForm.Group>
      <BForm.Group>
        <div>
          <div className="d-grid">
            <Button
              size="lg"
              variant="success"
              className="joe"
              style={{
                textAlign: 'left',
              }}
              onClick={handleSubmit}
              disabled={!canUserSubmit}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            >
              {submitting ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
          <div>{submitError ? submitError : null}</div>
        </div>
      </BForm.Group>
    </BForm>
  );
}
