import { useEffect, useState } from "react";
import { jobItem, jobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

type JobItemAPIResponse = {
  public: boolean;
  jobItem: jobItemExpanded;
};

type JobItemsAPIResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: jobItem[];
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

  return { jobItem: data, isLoading: isInitialLoading } as const;
}

const fetchJobItems = async (searchText: string): Promise<JobItemsAPIResponse> => {

    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to fetch job item');
    }

    const data = await response.json();

    return data.jobItems;
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


    return { jobItems: data?.jobItems, isLoading: isInitialLoading   } as const;

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