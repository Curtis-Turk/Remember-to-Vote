import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    messageType: "",
  });

  const [isCheckingPostCode, setIsCheckingPostCode] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const verifyPostCode = async () => {
    await setIsCheckingPostCode(true);
    console.log(isCheckingPostCode);
    const res = await fetch("verifyPostCode", {
      method: "POST",
      body: formData.postcode,
    });
    setIsCheckingPostCode(false);
    // On success
    // Colour postcode input green
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const res = await fetch("sendForm", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  return (
    <form id="polling-form" onSubmit={handleSubmit}>
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
        <button disabled={isCheckingPostCode} onClick={verifyPostCode}>
          {isCheckingPostCode ? "checking postcode" : "Verify postcode"}
        </button>
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
      <input type="submit" value="Submit" />
    </form>
  );
}
