"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ListElement } from "./components/ListElement";
import { IListProps } from "./types";
import { productApi } from "@/lib/api/product";
import Loader from "../Loader";

export const List = ({
  initialData,
  phrase = "",
  limit = 10,
  isFetchMoreDisabled,
}: IListProps) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(!isFetchMoreDisabled);
  const loader = useRef<HTMLDivElement>(null);

  const gridClasses = [
    "grid",
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    `gap-y-4`,
    `gap-x-4`,
  ]
    .filter(Boolean)
    .join(" ");

  const handleFetchMore = useCallback(async () => {
    const res = await productApi.proxySearchProducts(phrase, page, limit);
    if (res?.length) {
      setData((prev) => [...prev, ...res]);
      if (!(res.length < limit)) setPage(page + 1);
      else setIsMore(false);
    }
  }, [phrase, page, limit, initialData]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isMore) handleFetchMore();
      },
      { rootMargin: "200px" }
    );
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, [handleFetchMore]);

  return (
    <div>
      <ul className={gridClasses}>
        {data.map((item, index) => (
          <ListElement key={`product-${item.id}-${index}`} item={item} />
        ))}
      </ul>
      {isMore && (
        <div ref={loader} className="p-4">
          <Loader />
        </div>
      )}
    </div>
  );
};
