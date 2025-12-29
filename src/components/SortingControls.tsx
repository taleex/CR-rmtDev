import { SortBy } from "../lib/types";

type SortingControlsProps = {
  onClick: (newsortBy: SortBy) => void;
  sortBy: SortBy;
};

type SortyButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

export default function SortingControls({onClick, sortBy}: SortingControlsProps) {

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton onClick={() =>onClick('relevant')} isActive={sortBy === 'relevant'}>Relevant</SortingButton>
      <SortingButton onClick={() => onClick('recent')} isActive={sortBy === 'recent'}>Recent</SortingButton>

    </section>
  );
}

function SortingButton({children, onClick, isActive}:SortyButtonProps) {
  return ( 
    <button onClick={onClick} className={`sorting__button sorting__button--relevant ${ isActive ? 'sorting__button--active' : ''}`}>
        {children}
    </button> );
}
