export default function Form() {
  return (
    <form id="polling-form">
      <label htmlFor="fullname">Full Name * :</label>
      <input type="text" id="fullname" />
      <label htmlFor="phone">Phone Number * :</label>
      <input type="text" id="phone" />

      <label>When would you like a reminder?:</label>
      <p>
        One week before
        <input
          type="checkbox"
          name="reminders[]"
          id="one-week"
          value="7 days"
        />
        Three days before
        <input
          type="checkbox"
          name="reminders[]"
          id="three-days"
          value="3 days"
        />
        On the day
        <input type="radio" name="reminders[]" id="on-the-day" value="0 days" />
      </p>
      <input type="submit" value="click here to submit" />
    </form>
  );
}
