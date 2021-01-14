import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { EntriesContext } from "../contexts/EntriesContext";
import { AdminContext } from "../contexts/AdminContext";

const DisplayOneEntry = () => {
  const { ListEntries, delEntry } = useContext(EntriesContext);
  const { AdminLogin } = useContext(AdminContext);
  const { id } = useParams();
  const history = useHistory();

  const entry = ListEntries.filter((t) => {
    return t._id === id;
  });

  return (
    <div className="oneEntry">
      <div className="oneEntryTitle">Title: {entry[0].title} </div>
      <div className="oneEntrySnippet">Snippet: {entry[0].snippet}</div>
      <br />
      <div className="oneEntryBody">{entry[0].body}...</div>
      {AdminLogin ? (
        <div style={{ display: "inline-block" }}>
          <button id="delete" onClick={() => delEntry(entry[0]._id)}>
            Delete
          </button>
          <button
            id="edit"
            onClick={() => history.push(`/editEntry/${entry[0]._id}`)}
          >
            Edit
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayOneEntry;
