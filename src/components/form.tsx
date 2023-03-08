export default function Form() {
  return (
    <form id="polling-form">
      <label>Full Name * :</label>
      <input type="text" name="fullname" />
      <label>Phone Number * :</label>
      <input type="text" name="phone" />
      <label>When would you like a reminder?:</label>
      <p>
        One week before
        <input
          type="checkbox"
          name="reminders[]"
          id="one-week"
          value="7 days"
        />
        <br />
        Three days before
        <input
          type="checkbox"
          name="reminders[]"
          id="three-days"
          value="3 days"
        />
        <br />
        On the day
        <input type="radio" name="reminders[]" id="on-the-day" value="0 days" />
        <br />
      </p>
      <input type="submit" value="click here to submit" />
    </form>
  );
}
