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
import { useJobItems } from "../lib/hooks";
import { useEffect, useState } from "react";

function App() {

  const [searchText, setSearchText] = useState("");
  const [jobItems, isLoading] = useJobItems(searchText);
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {

    const handleHashChange = () => {
     const id =  +window.location.hash.slice(1);
     setActiveID(id || null);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
  
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    }

  },[]);

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
          <ResultsCount />
          <SortingControls />
        </SidebarTop>
        <JobList isLoading={isLoading} jobItems={jobItems}/>
        <PaginationControls />
      </Sidebar>

      <JobItemContent />
    </Container>

    <Footer />
    </>;
}

export default App;
