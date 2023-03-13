import { useState } from "react";
import PhoneInput from "react-phone-number-input";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    messageType: "WhatsApp",
    addressSlug: "",
  });

  // boolean for if postcode is being checked by the Electoral Commission API
  const [isVerifyPostcodeDisabled, setIsVerifyPostcodeDisabled] =
    useState(false);
  // boolean for if the verify postcode button is being rendered
  const [isVerifyPostcodeButtonRendered, setIsVerifyPostcodeButtonRendered] =
    useState(true);
  // boolean for if postcode has been verified with the Electoral Commission API
  const [isPostcodeVerified, setIsPostCodeVerified] = useState(false);
  // boolean for if postcode is not found
  const [isPostcodeMissing, setIsPostcodeMissing] = useState(false);

  // boolean for if cancel button is rendered
  const [isCancelButtonRendered, setIsCancelButtonRendered] = useState(false);
  // array of address objects from the Electoral Commision API
  const [addresses, setAddresses] = useState([]);

  interface addressObject {
    address?: string;
    postcode?: string;
    slug?: string;
  }
  // object of the selected address object
  const [selectedAddress, setSelectedAddress] = useState<addressObject>({});
  const handleTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    if (name === "postcode") await setIsPostCodeVerified(false);

    await setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const verifyPostCode = async () => {
    if (isPostcodeMissing) await setIsPostcodeMissing(false);
    await setIsVerifyPostcodeDisabled(true);

    // const response = await fetch("verifyPostCode", {
    //   method: "POST",
    //   body: formData.postcode,
    // });
    // const result = await response.json();

    const result: any = {
      pollingStationFound: true,
      pollingStations: [
        {
          address: "123 Privet Drive, London",
          postcode: "W12 LKW",
          slug: "12345",
        },
        {
          address: "124 dawn road, London",
          postcode: "W12 LKW",
          slug: "67890",
        },
      ],
    };

    if (!result.pollingStationFound && !result.pollingStations.length) {
      await setIsPostcodeMissing(true);
      await setIsVerifyPostcodeDisabled(false);
      return;
    }
    // on single result
    if (result.pollingStationFound) {
      // if postcode is verified, then form can be submitted.
      await setIsPostCodeVerified(true);
      // Colour postcode input green
    }

    if (result.pollingStations.length) {
      await setIsVerifyPostcodeButtonRendered(false);
      await setAddresses(result.pollingStations);
    }

    await setIsCancelButtonRendered(true);
  };

  /* takes an addressObject and sets the address in the form data to be the value of the object
  removes addresses from addresses array state to clear addresses from the DOM
  sets isPostcodeVerified to true */
  const setAddress = async (addressObject: any) => {
    await setFormData((formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    await setSelectedAddress(addressObject);
    await setAddresses([]);
    await setIsPostCodeVerified(true);
  };

  const handleSubmit = async () => {
    if (formData.name && formData.phone && isPostcodeVerified) {
      console.log(formData);
      const res = await fetch("sendForm", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      return;
    }
    if (!formData.name) {
      return;
    }
    if (!formData.phone) {
      return;
    }
    if (!isPostcodeVerified) {
      // SET message to verify postcode
      return;
    }
  };

  const cancelPostcodeSelection = async () => {
    await setIsVerifyPostcodeDisabled(false);
    await setIsVerifyPostcodeButtonRendered(true);
    await setIsPostCodeVerified(false);
    await setIsCancelButtonRendered(false);
    await setSelectedAddress({});
    await setAddresses([]);
  };

  const renderCancelButton = () => {
    if (isCancelButtonRendered) {
      return (
        <button id="cancel-btn" onClick={cancelPostcodeSelection}>
          Cancel
        </button>
      );
    }
  };

  const renderAddressesSelectionDiv = () => {
    if (addresses.length) {
      return (
        <div>
          <p>Select your address from the options below:</p>
          {addresses.map((addressObject: any) => (
            <button
              key={addressObject.address}
              className="address-btn"
              onClick={() => setAddress(addressObject)}
            >
              {addressObject.address}
            </button>
          ))}
        </div>
      );
    }

    // if selectedAddress object has been set
    if (Object.keys(selectedAddress).length) {
      return (
        <div>
          <label htmlFor="address">Address * :</label>
          <input
            type="text"
            id="address"
            name="address"
            disabled={true}
            value={selectedAddress.address}
          />
        </div>
      );
    }
  };

  const renderVerifyPostcodeButton = () => {
    let verifyPostCodeButtonText = "Verify postcode";
    if (isVerifyPostcodeDisabled) {
      verifyPostCodeButtonText = "Checking postcode";
    }
    if (isPostcodeVerified) {
      verifyPostCodeButtonText = "Postcode verified!";
    }
    if (isVerifyPostcodeButtonRendered) {
      return (
        <button
          id="verify-btn"
          disabled={isVerifyPostcodeDisabled}
          onClick={verifyPostCode}
        >
          {verifyPostCodeButtonText}
        </button>
      );
    }
  };

  const handlePhoneInputChange = async (phoneNumber: any) => {
    console.log(phoneNumber);
    await setFormData((formData) => ({
      ...formData,
      phone: phoneNumber,
    }));
  };

  return (
    <div id="polling-form">
      <div id="user-details">
        <label htmlFor="name">Name * :</label>
        <input type="text" id="name" name="name" onChange={handleTextChange} />
        <label htmlFor="phone">Phone Number * :</label>
        <PhoneInput defaultCountry="GB" onChange={handlePhoneInputChange} />
        <label htmlFor="postcode">Postcode * :</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          disabled={isVerifyPostcodeDisabled}
          onChange={handleTextChange}
        />
        {renderVerifyPostcodeButton()}
        {renderAddressesSelectionDiv()}
        {renderCancelButton()}
        {isPostcodeMissing ? <div>Postcode has not been found</div> : null}
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
          Text
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
}
