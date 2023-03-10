import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    messageType: "",
    addressSlug: "",
  });

  // boolean for if postcode is being checked by the Electoral Commission API
  const [isVerifyPostcodeDisabled, setIsVerifyPostcodeDisabled] =
    useState(false);
  // boolean for if postcode has been verified with the Electoral Commission API
  const [isPostcodeVerified, setIsPostCodeVerified] = useState(false);
  // array of address objects from the Electoral Commision API
  const [addresses, setAddresses] = useState([]);

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
    await setIsVerifyPostcodeDisabled(true);

    // const response = await fetch("verifyPostCode", {
    //   method: "POST",
    //   body: formData.postcode,
    // });
    // const result = await response.json();

    const result: any = {
      pollingStationFound: false,
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

    // if polling station returned...

    // option 1: found a polling station
    // option 2: found multiple polling stations
    // option 3: no postcode found
    // if response received:
    // backend response if postcode is validated as postcode format:
    /*
    result => {
      pollingStationFound: false,
      pollingStations: [
        polling1,
        polling2...
      ]
    }
    */

    // on single result
    if (result.pollingStationFound) {
      // if postcode is verified, then form can be submitted.
      await setIsPostCodeVerified(true);
      // Colour postcode input green
      await setIsVerifyPostcodeDisabled(false);
    }

    if (result.pollingStations) {
      await setAddresses(result.pollingStations);
    }
  };

  /* takes an addressObject and sets the address in the form data to be the value of the object
  removes addresses from addresses array state to clear addresses from the DOM
  sets isPostcodeVerified to true */
  const setAddress = async (addressObject: any) => {
    await setFormData((formData) => ({
      ...formData,
      addressSlug: addressObject.slug,
    }));
    await setAddresses([]);
    await setIsPostCodeVerified(true);
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (!isPostcodeVerified) {
      // SET message to verify postcode
      return;
    }

    const res = await fetch("sendForm", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  const addressesSelectionDiv = () => {
    if (addresses.length) {
      return (
        <div>
          <button>Cancel</button>
          <p>Select your address from the options below:</p>
          {addresses.map((addressObject: any) => (
            <button
              key={addressObject.address}
              onClick={() => setAddress(addressObject)}
            >
              {addressObject.address}
            </button>
          ))}
        </div>
      );
    }
  };

  const renderVerifyPostcodeButton = () => {
    if (!isVerifyPostcodeDisabled) {
      return (
        <button disabled={isVerifyPostcodeDisabled} onClick={verifyPostCode}>
          Verify postcode
        </button>
      );
    }
  };

  return (
    <div id="polling-form">
      <div id="user-details">
        <label htmlFor="name">Name * :</label>
        <input type="text" id="name" name="name" onChange={handleTextChange} />
        <label htmlFor="phone">Phone Number * :</label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={handleTextChange}
        />
        <label htmlFor="postcode">Postcode * :</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          onChange={handleTextChange}
        />
        {renderVerifyPostcodeButton()}
        {addressesSelectionDiv()}
      </div>

      <fieldset id="message-type">
        <legend>How would you like your reminder?</legend>
        <span>
          Text
          <input
            type="radio"
            name="messageType"
            id="text"
            value="text"
            onChange={handleTextChange}
          />
        </span>
        <span>
          Whatsapp
          <input
            type="radio"
            name="messageType"
            id="whatsapp"
            value="whatsapp"
            onChange={handleTextChange}
          />
        </span>
      </fieldset>
      <div>We will send you a reminder on the day of the election</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
