"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ListElement } from "./components/ListElement";
import { IListProps } from "./types";
import { productApi } from "@/lib/api/product";
import Loader from "../Loader";

export const List = ({
  initialData,
  phrase = "",
  limit = 12,
  isFetchMoreDisabled,
  hasMore,
  nextPage,
}: IListProps) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(nextPage);
  const [startingAfter, setStartingAfter] = useState<string | undefined>(
    initialData.length ? initialData[initialData.length - 1].id : undefined
  );
  const [isMore, setIsMore] = useState(!isFetchMoreDisabled && !!hasMore);
  const loader = useRef<HTMLDivElement>(null);
  const isPhrase = !!phrase.length;

  const gridClasses = [
    "grid",
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    `gap-y-4`,
    `gap-x-4`,
  ].join(" ");

  const handleFetchMore = useCallback(async () => {
    if (isPhrase) {
      setStartingAfter(undefined);
      const res = await productApi.searchProducts(
        phrase,
        limit,
        page || undefined
      );

      if (res?.data.length) {
        setData((prev) => [...prev, ...res.data]);

        if (res.has_more) setPage(res.next_page);
        else setIsMore(false);
      }
    } else {
      const res = await productApi.getProductList(startingAfter);

      if (res?.data.length) {
        setData((prev) => [...prev, ...res.data]);

        if (res.has_more) setStartingAfter(res.data[res.data.length - 1].id);
        else {
          setIsMore(false);
          setStartingAfter(undefined);
        }
      }
    }
  }, [phrase, page, limit, startingAfter, isPhrase]);

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
