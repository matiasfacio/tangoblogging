import React, { useContext } from "react";
import { EntriesContext } from "../contexts/EntriesContext";
import { Link } from 'react-router-dom';

const EntryLast = () => {
  const { ListEntries } = useContext(EntriesContext);

  return (
    <section id="two">
      {typeof ListEntries !== "undefined" && ListEntries.length > 0 ? (
        <div className="lastEntry">
          <div className="lastEntry_title">Last Entry Blog</div>
          <div className="card">
              <div className="card_title">{ListEntries[0].title}</div>
              <div className="update">
                {ListEntries[0].updatedAt.slice(0, 10)}
              </div>
              <div className="snippet">{ListEntries[0].snippet}</div>
              <div className="card_text">{ListEntries[0].body}</div>
              <Link to={`/entry/${ListEntries[0]._id}`}>Read More</Link>
            </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default EntryLast;
