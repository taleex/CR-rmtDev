
type SearchFormProps = {
  onSetSearchText: (searchText: string) => void;
  searchText: string;
};

export default function SearchForm({onSetSearchText, searchText}:SearchFormProps) {

  return (
    <form onSubmit={e => {
      e.preventDefault();
    }} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={e =>{
          onSetSearchText(e.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
