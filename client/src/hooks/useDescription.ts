import { useEffect } from "react";

export function useDescription(description: string) {
  useEffect(() => {
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
    return () => {
      meta?.setAttribute("content", "Patrick MacCartee is a licensed East Bay real estate agent with The Grubb Company, specializing in Oakland, Berkeley, Piedmont, and Alameda home sales.");
    };
  }, [description]);
}
