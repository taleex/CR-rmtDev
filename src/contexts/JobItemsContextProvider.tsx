import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { jobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
    jobItems:jobItem[] | undefined
    jobItemsSortedAndSliced: jobItem[];
    isLoading: boolean;
    totalNumberOfResults: number;
    totalNumberOfPages: number;
    currentPage: number;
    sortBy: SortBy;
    handleChangePage: (direction: PageDirection) => void;
    handleSortChange: (newsortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null >(null);

export default function JobItemsContextProvider({children}: {children: React.ReactNode}) {
    
  //Context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const {jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevant');
  
  // derived state

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  const jobItemsSorted = useMemo(() => 
    [...(jobItems || [])].sort((a,b) => {

    if(sortBy === 'relevant'){
      return b.relevanceScore - a.relevanceScore;
    }
    else {
      return a.daysAgo - b.daysAgo;
    }
  })
, [sortBy, jobItems]);

  const jobItemsSortedAndSliced = useMemo (() => jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  ) , [currentPage, jobItemsSorted]);

  // events handlers / actions

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  }, []);

  const handleSortChange = useCallback((newsortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newsortBy);
  }, []);


  const ContextValue = useMemo(() => ({ 
    jobItems,
    jobItemsSortedAndSliced,
    isLoading,
    totalNumberOfResults,
    totalNumberOfPages,
    currentPage,
    sortBy,
    handleChangePage,
    handleSortChange 
  }), 
  [
    jobItems,
    jobItemsSortedAndSliced,
    isLoading,
    totalNumberOfResults,
    totalNumberOfPages,
    currentPage,
    sortBy,
    handleChangePage,
    handleSortChange
  ]);




  return (
    <JobItemsContext.Provider value={ContextValue}>
      {children}
    </JobItemsContext.Provider>
  )
}

