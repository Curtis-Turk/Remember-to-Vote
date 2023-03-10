export default function Reminder() {
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name: string = e.target.name;
    // const checked: boolean = e.target.checked;
    // setFormData((formData) => ({
    //   ...formData,
    //   [name]: checked,
    // }));
  };
  return (
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
  );
}
