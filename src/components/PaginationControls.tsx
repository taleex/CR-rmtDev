import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: 'next' | 'previous') => void;
  currentPage: number;
};

type PaginationButtonProps = {
  direction: 'next' | 'previous';
  onClick: () => void;
  currentPage: number;
};

export default function PaginationControls({onClick, currentPage}:PaginationControlsProps) {

  return <section className="pagination">
    { currentPage > 1 && (
    <PaginationButtons direction='previous' currentPage={currentPage} onClick={() => onClick('previous')}/>
    )}
    <PaginationButtons direction='next' currentPage={currentPage} onClick={() => onClick('next')}/>
  </section>;
}

function PaginationButtons({direction, currentPage, onClick}: PaginationButtonProps) {
  return (
  <button onClick={onClick} className={`pagination__button pagination__button--${direction}` } > 
    { direction === 'previous' && (
      <>
        <ArrowLeftIcon/>
        Page {currentPage-1}
      </>
    )} 
    { direction === 'next' && (
      <>
        Page {currentPage+1}
        <ArrowRightIcon/>
      </>
      )
    }
     
</button>
);
}