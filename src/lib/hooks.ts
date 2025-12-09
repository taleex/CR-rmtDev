import { useEffect, useState } from "react";
import { jobItem, jobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";


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

export function useJobItem(id: number | null) {
      
  const [JobItem, setJobItem] = useState<jobItemExpanded | null >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if(!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };

    fetchData();

  }, [id]);

  return { JobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {

      const [jobItems, setJobItems] = useState<jobItem[]>([]);
      const [isLoading, setIsLoading] = useState(false);

      const totalNumberOfResults = jobItems.length;
      const jobitemsSliced = jobItems.slice(0, 7);
    
      useEffect(() => {
    
        if(!searchText) return;
    
        const fetchData = async () => {
              setIsLoading(true);
              const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
              const data = await response.json();
              setIsLoading(false);
              setJobItems(data.jobItems);
        };
        fetchData();
            },[searchText]);
    
        return { jobitemsSliced, isLoading, totalNumberOfResults  };
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