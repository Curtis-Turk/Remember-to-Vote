export default function Form2() {
  return (
    <form id="polling-form">
      <label htmlFor="fullname">Full Name * :</label>
      <input type="text" id="fullname" required pattern="[a-zA-Z ]+" />

      <label htmlFor="phone">Phone Number * :</label>
      <input type="tel" id="phone" required pattern="[0-9]{10}" />

      <fieldset id="reminder">
        <legend>When would you like a reminder?</legend>
        <input
          type="checkbox"
          name="reminders[]"
          id="one-week"
          value="7 days"
        />
        <label htmlFor="one-week">One week before</label>
        <br />
        <input
          type="checkbox"
          name="reminders[]"
          id="three-days"
          value="3 days"
        />
        <label htmlFor="three-days">Three days before</label>
        <br />
        <input type="radio" name="reminders[]" id="on-the-day" value="0 days" />
        <label htmlFor="on-the-day">On the day</label>
      </fieldset>

      <fieldset id="message-type">
        <legend>How would you like your reminder?</legend>
        <label>
          <input type="radio" name="message-type" value="text" />
          Text
        </label>
        <label>
          <input type="radio" name="message-type" value="whatsapp" />
          Whatsapp
        </label>
      </fieldset>

      <input type="submit" value="Submit" />
      <input type="reset" value="Clear" />
    </form>
  );
}
