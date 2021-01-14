import React, { useContext, useRef, useState } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { EntriesContext } from "../contexts/EntriesContext";
import Loggin from "../components/Loggin";

const NewEntry = () => {
  const [newEntryBlog, setNewEntryBlog] = useState({
    title: "",
    snippet: "",
    body: "",
  });
  const { addEntry } = useContext(EntriesContext);
  const { AdminLogin } = useContext(AdminContext);
  const refer = useRef();

  return (
    <div className="new_entry_container">
      {AdminLogin ? (
        <div>
          <div className="page_title">
            <h2>New Entry</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(newEntryBlog);
              addEntry(newEntryBlog);
              setNewEntryBlog({
                title: "",
                snippet: "",
                body: "",
              });
              refer.current.focus();
            }}
          >
            <label>Title</label>
            <input
              ref={refer}
              type="text"
              value={newEntryBlog.title}
              required
              onChange={(e) =>
                setNewEntryBlog({ ...newEntryBlog, title: e.target.value })
              }
            />
            <label>Snippet</label>
            <input
              type="text"
              value={newEntryBlog.snippet}
              required
              onChange={(e) =>
                setNewEntryBlog({ ...newEntryBlog, snippet: e.target.value })
              }
            />
            <label>Body</label>
            <textarea
              placeholder="..ingrese el texto.."
              value={newEntryBlog.body}
              required
              onChange={(e) =>
                setNewEntryBlog({ ...newEntryBlog, body: e.target.value })
              }
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <Loggin/>
      )}
    </div>
  );
};

export default NewEntry;
