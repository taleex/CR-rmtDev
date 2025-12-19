import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounced, useJobItems } from "../lib/hooks";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {

  // state

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText, 250);
  const {jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevant');
  
  // derived state

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = 
    [...(jobItems || [])].sort((a,b) => {

    if(sortBy === 'relevant'){
      return b.relevanceScore - a.relevanceScore;
    }
    else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobitemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // events handlers / actions
  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };
  const handleSortChange = (newsortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newsortBy);
  }

  return <>  
    <Background />

    <Header>
       <HeaderTop>
        <Logo />
        <BookmarksButton />
      </HeaderTop>
      <SearchForm searchText={searchText} onSetSearchText={setSearchText} />
    </Header>

    <Container>
      <Sidebar> 
        <SidebarTop>
          <ResultsCount totalNumberOfResults={totalNumberOfResults}/>
          <SortingControls sortBy={sortBy} onClick={handleSortChange} />
        </SidebarTop>
        <JobList isLoading={isLoading} jobItems={jobitemsSortedAndSliced}/>
        <PaginationControls totalNumberOfPages={totalNumberOfPages} currentPage={currentPage} onClick={handleChangePage}/>
      </Sidebar>

      <JobItemContent/>
    </Container>

    <Footer />

    <Toaster position="top-right" />
    </>;
}

export default App;
