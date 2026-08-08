import { useState } from "react";
import "./Searchbar.css";

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchValue = value.trim();

    if (!searchValue) {
      return;
    }

    onSubmit(searchValue);
    setValue("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <button
          className="SearchForm-button"
          type="submit"
        >
          Search
        </button>
      </form>
    </header>
  );
}