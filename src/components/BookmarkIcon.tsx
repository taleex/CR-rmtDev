import { BookmarkFilledIcon } from "@radix-ui/react-icons";

export default function BookmarkIcon({jobitem}) {
  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon className="filled" />
    </button>
  );
}
