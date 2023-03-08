import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    oneWeek: false,
    threeDays: false,
    messageType: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form id="polling-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name * :</label>
      <input type="text" id="name" />
      <label htmlFor="phone">Phone Number * :</label>
      <input type="text" id="phone" />
      We will send you a reminder on the day of the election
      <fieldset id="reminder">
        <legend>Would you like an additional reminder?:</legend>
        <label htmlFor="one-week">
          One week before
          <input
            type="checkbox"
            name="reminders[]"
            id="one-week"
            value="7 days"
          />
        </label>
        <label htmlFor="three-days">
          Three days before
          <input
            type="checkbox"
            name="reminders[]"
            id="three-days"
            value="3 days"
          />
        </label>
      </fieldset>
      <fieldset id="message-type">
        <legend>How would you like your reminder?</legend>
        <span>
          Text <input type="radio" name="type" id="text" />
        </span>
        <span>
          Whatsapp <input type="radio" name="type" id="whatsapp" />
        </span>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
