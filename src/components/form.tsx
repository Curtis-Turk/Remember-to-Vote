import { useState, Dispatch, SetStateAction } from "react";
import PhoneInput from "react-phone-number-input";

interface formProps {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

interface addressObject {
  address?: string;
  postcode?: string;
  slug?: string;
}

interface pollingStationsObject {
  pollingStationFound: boolean;
  pollingStations: addressObject[];
  errorMessage?: string;
}

export const Form = ({ setIsFormSubmitted }: formProps) => {
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
  const [isVerifyPostcodeButtonRendered, setIsVerifyPostcodeButtonRendered] =
    useState(true);
  // boolean for if postcode has been verified with the Electoral Commission API
  const [isPostcodeVerified, setIsPostCodeVerified] = useState(false);

  const [verifyPostcodeMessage, setVerifyPostcodeMessage] = useState("");

  const [isCancelButtonRendered, setIsCancelButtonRendered] = useState(false);

  // array of address objects from the Electoral Commision API
  const [addresses, setAddresses] = useState<addressObject[]>([]);

  // object of the selected address object
  const [selectedAddress, setSelectedAddress] = useState<addressObject>({});

  const handleTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    if (name === "postcode") setIsPostCodeVerified(false);

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = async (phoneNumber: any) => {
    setFormData((formData) => ({
      ...formData,
      phone: phoneNumber,
    }));
  };

  const isPostcodeValid = (postcode: string): boolean => {
    return /^[A-Za-z0-9 ]*$/.test(postcode);
  };

  const verifyPostCode = async () => {
    if (!isPostcodeValid(formData.postcode)) {
      setVerifyPostcodeMessage(
        "Please only use alphanumeric characters and spaces"
      );
      return;
    }
    await setIsVerifyPostcodeDisabled(true);
    const response = await fetch(
      `${process.env.REACT_APP_API as string}/postcode`,
      {
        method: "POST",
        body: JSON.stringify({ postcode: formData.postcode }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // TODO: implement error checking if fetch fails

    const result = (await response.json()) as pollingStationsObject;

    if (!result.pollingStationFound && !result.pollingStations.length) {
      switch (result.errorMessage) {
        case "Could not geocode from any source":
          setVerifyPostcodeMessage("Postcode could not be found");
          break;
        case "Connection issue whilst verifying postcode":
          setVerifyPostcodeMessage(result.errorMessage);
          break;
        default:
          setVerifyPostcodeMessage(
            "There are no upcoming ballots in your area"
          );
          break;
      }
      setIsVerifyPostcodeDisabled(false);
      return;
    }
    // on single result
    if (result.pollingStationFound) {
      // if postcode is verified, then form can be submitted.
      setIsPostCodeVerified(true);
      // Colour postcode input green
    }

    if (result.pollingStations.length) {
      setIsVerifyPostcodeButtonRendered(false);
      setAddresses(result.pollingStations);
    }
    setVerifyPostcodeMessage("");
    setIsCancelButtonRendered(true);
  };

  const setAddress = async (addressObject: any) => {
    /* takes an addressObject and sets the address in the form data to be the value of the object
    removes addresses from addresses array state to clear addresses from the DOM
    sets isPostcodeVerified to true */
    setFormData((formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    setSelectedAddress(addressObject);
    setAddresses([]);
    setIsPostCodeVerified(true);
  };

  const cancelPostcodeSelection = async () => {
    setIsVerifyPostcodeDisabled(false);
    setIsVerifyPostcodeButtonRendered(true);
    setIsPostCodeVerified(false);
    setIsCancelButtonRendered(false);
    setSelectedAddress({});
    setAddresses([]);
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
          {addresses.map((addressObject: addressObject) => (
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

  const handleSubmit = async () => {
    if (formData.name && formData.phone && isPostcodeVerified) {
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
    if (!isPostcodeVerified) {
      // SET message to verify postcode
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
        {verifyPostcodeMessage.length ? (
          <div>{verifyPostcodeMessage}</div>
        ) : null}
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
