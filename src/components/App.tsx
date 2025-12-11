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

function App() {

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText, 250);
  const {jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const jobitemsSliced = jobItems?.slice(0, 7) || [];

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
          <SortingControls />
        </SidebarTop>
        <JobList isLoading={isLoading} jobItems={jobitemsSliced }/>
        <PaginationControls />
      </Sidebar>

      <JobItemContent/>
    </Container>

    <Footer />

    <Toaster position="top-right" />
    </>;
}

export default App;
