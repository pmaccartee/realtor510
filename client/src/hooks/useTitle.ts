import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Patrick MacCartee | Oakland Real Estate Agent | East Bay Homes";
    };
  }, [title]);
}
