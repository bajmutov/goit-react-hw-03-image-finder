const Filter = ({ changeFilter, value }) => {
  return (
    <div>
      <label htmlFor="findContact" className="form-label">
        Find contacts by name
      </label>
      <input
        className="form-input filterInput"
        name="title"
        type="text"
        onChange={changeFilter}
        value={value}
        id="findContact"
        placeholder="Jacob Mercer"
      />
    </div>
  );
};

export default Filter;
