import React, { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../contexts/EntriesContext";
import { useParams, useHistory } from "react-router-dom";

const EditEntry = () => {
  const { ListEntries, editEntry } = useContext(EntriesContext);
  const { id } = useParams();
  const history = useHistory();
  const item = ListEntries.filter((t) => {
    return t._id === id;
  });
  const [editedEntry, setEditedEntry] = useState({
    title: item[0].title,
    snippet: item[0].snippet,
    body: item[0].body,
    _id: item[0]._id,
  });
 
  useEffect(() => {
 
    // setEditedEntry({
    //   title: item[0].title,
    //   snippet: item[0].snippet,
    //   body: item[0].body,
    //   _id: item[0]._id,
    // });
  }, []);
  

  return (
    <div>
      <h2>Edit</h2>
      {editedEntry ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editEntry(editedEntry);
            setEditedEntry(null);
            history.push('/');
          }}
        >
          <label>Title:</label>
          <input
            type="text"
            value={editedEntry.title}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, title: e.target.value })
            }
          />
          <label>Snippet:</label>
          <input
            type="text"
            value={editedEntry.snippet}
            onChange={(e) => {
              setEditedEntry({ ...editedEntry, snippet: e.target.value });
            }}
          />
          <label>Body:</label>
          <textarea
            type="text"
            value={editedEntry.body}
            onChange={(e) => {
              setEditedEntry({ ...editedEntry, body: e.target.value });
            }}
          />
          <button type="submit">Submit Changes</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditEntry;
