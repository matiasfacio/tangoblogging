import React, { useContext } from "react";
import { EntriesContext } from "../contexts/EntriesContext";
import { AdminContext } from "../contexts/AdminContext";
import { useHistory, useParams } from "react-router-dom";

const Search = () => {
  const { findString, delEntry } = useContext(EntriesContext);
  const { AdminLogin } = useContext(AdminContext);
  const { query } = useParams();
  const searchEntry = findString(query);
  const history = useHistory();

  return (
    <div className="displaySearchEntry">
      <h2>Search Results:</h2>
      {searchEntry.length > 0 ? (
        <div>
          Articles founded:{" "}
          <span style={{ fontWeight: "bold" }}>{searchEntry.length}</span>
        </div>
      ) : (
        ""
      )}
      {searchEntry.length > 0
        ? searchEntry.map((t, index) => {
            return (
              <div key={index} className="oneEntry">
                <div className="oneEntryTitle">Title: {t.title} </div>
                Snippet: {t.snippet}
                <br />
                <div className="oneEntryBody">{t.body.slice(0, 160)}...</div>
                <button
                  id="readMore"
                  onClick={() => history.push(`/entry/${t._id}`)}
                >
                  Read More
                </button>
                {AdminLogin ? (
                  <div style={{ display: "inline-block" }}>
                    <button id="delete" onClick={() => delEntry(t._id)}>
                      Delete
                    </button>
                    <button
                      id="edit"
                      onClick={() => history.push(`/editEntry/${t._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                ) : null}
                <hr />
              </div>
            );
          })
        : "Article founded: 0"}
    </div>
  );
};

export default Search;
