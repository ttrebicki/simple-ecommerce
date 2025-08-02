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
  hasMore,
}: IListProps) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(!isFetchMoreDisabled && !!hasMore);
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
    const res = !!phrase.length
      ? await productApi.searchProducts(phrase, page, limit)
      : await productApi.getProductList();
    if (res?.data.length) {
      setData((prev) => [...prev, ...res.data]);
      if (!res.has_more) setPage(page + 1);
      else setIsMore(false);
    }
  }, [phrase, page, limit]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isMore) handleFetchMore();
      },
      { rootMargin: "200px" }
    );
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, [handleFetchMore, isMore]);

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [!!phrase.length]);

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
