import { useState, Dispatch, SetStateAction } from "react";
import PhoneInput from "react-phone-number-input";
import { Postcode } from "./Postcode";

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

  const [formData, setFormData] = useState<formData>({
    name: "",
    phone: "",
    postcode: "",
    messageType: "WhatsApp",
    addressSlug: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = (phoneNumber: any) => {
    setFormData((formData) => ({
      ...formData,
      phone: phoneNumber,
    }));
  };

  const handleSubmit = async () => {
    if (formData.name && formData.phone) {
      const response = await fetch(
        `${process.env.REACT_APP_API as string}/submit`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await setIsFormSubmitted(true);
      }
    }
    if (!formData.name) {
      // changes state of name error
      // change state of error object
      return;
    }
    if (!formData.phone) {
      return;
    }
  };

  return (
    <div id="polling-form">
      <div id="user-details">
        <label htmlFor="name">Name * :</label>
        <input type="text" id="name" name="name" onChange={handleTextChange} />
        <label htmlFor="phone">Phone Number * :</label>
        <PhoneInput defaultCountry="GB" onChange={handlePhoneInputChange} />
        <Postcode
          // isPostcodeVerified={isPostcodeVerified}
          // setIsPostcodeVerified={setIsPostCodeVerified}
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
            id="WhatsApp"
            value="WhatsApp"
            defaultChecked={true}
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
      <div>We will send you a reminder on the day of the election</div>
      <button onClick={handleSubmit} id="submit-form-btn">
        Submit
      </button>
    </div>
  );
};
