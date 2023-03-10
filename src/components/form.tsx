import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    oneWeek: false,
    threeDays: false,
    messageType: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const checked: boolean = e.target.checked;

    setFormData((formData) => ({
      ...formData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
      </div>

      <div>We will send you a reminder on the day of the election</div>
      <br></br>
      <fieldset id="reminder">
        <legend>Would you like an additional reminder?:</legend>
        <label htmlFor="one-week">
          One week before
          <input
            type="checkbox"
            name="oneWeek"
            id="one-week"
            onChange={handleCheckChange}
          />
        </label>
        <label htmlFor="three-days">
          Three days before
          <input
            type="checkbox"
            name="threeDays"
            id="three-days"
            onChange={handleCheckChange}
          />
        </label>
      </fieldset>
      <fieldset id="message-type">
        <legend>How would you like your reminder?</legend>
        <span>
          Text{" "}
          <input
            type="radio"
            name="messageType"
            id="text"
            value="text"
            onChange={handleTextChange}
          />
        </span>
        <span>
          Whatsapp{" "}
          <input
            type="radio"
            name="messageType"
            id="whatsapp"
            value="whatsapp"
            onChange={handleTextChange}
          />
        </span>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
