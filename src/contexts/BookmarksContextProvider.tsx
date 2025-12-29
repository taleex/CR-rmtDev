import { createContext, useState } from "react";

export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({children}: {children: React.ReactNode}) {

  const [bookmarkedIds, setBookmarkIds] = useState<number[]>([]);

    const handleToggleBookmark = (id: number) => {
      if (bookmarkedIds.includes(id)) {
        setBookmarkIds((prev) => prev.filter((item) => item !== id));
      } else {
        setBookmarkIds((prev) => [...prev, id]);
      }
    };

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}
