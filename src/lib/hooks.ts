import { useContext, useEffect, useState } from "react";
import { jobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type JobItemAPIResponse = {
  public: boolean;
  jobItem: jobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  jobItems: jobItemExpanded[];
  sorted: boolean;
};


const fetchJobItem = async (id: number): Promise<JobItemAPIResponse> =>  {
      const response = await fetch(`${BASE_API_URL}/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to fetch job item');
      }

      const data = await response.json();
      return data;
    };

export function useJobItem(id: number | null) {
 
  const {data, isInitialLoading} = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null), 
    {
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

const fetchJobItems = async (searchText: string):Promise<JobItemsApiResponse> => {

    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to fetch job item');
    }

    const data = await response.json();

    return data;
}

export function useJobItems(searchText: string) {

    const {data, isInitialLoading} = useQuery(
      ['job-items', searchText],
      () => fetchJobItems(searchText), 
      {
        enabled: Boolean(searchText),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        onError: handleError,
        }
    );

    const jobItems = data?.jobItems;

    return { jobItems: jobItems, isLoading: isInitialLoading   } as const;

}        

export function useDebounced<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() =>{
        const timerID = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
    
        return () => clearTimeout(timerID);
      }, [value, delay]);

      return debouncedValue;
}

export function useActiveID(){

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
      
      return activeID;
}

export function useLocalStorage<T>(key:string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

  useEffect(() => {
     localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

//


export function useBookmarksContext() {

    const context = useContext(BookmarksContext);
    if (!context) {
      throw new Error(" useBookmarksContext must be used withn a BookmarkContextProvider");
    }
  
    return context;

}