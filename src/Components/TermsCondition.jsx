import React, { useEffect, useState } from "react";
import Card from "./Card";
import contacts from "./Contact";
import Loader from "./Loader";
function TermsCondition() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  let contactSearch = contacts.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Search-div">
          <input
            placeholder="Search..."
            className="Term-Search"
            value={filter}
            onChange={searchText}
          />

          {contactSearch.map((item, index) => {
            return (
              <Card
                title={item.title}
                subTitle={item.subTitle}
                Para={item.Para}
                images={item.images}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TermsCondition;
