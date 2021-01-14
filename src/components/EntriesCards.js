import React, { useContext, useEffect } from "react";
import { EntriesContext } from "../contexts/EntriesContext";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";
import Loading from "./Loading";

const EntriesCards = () => {
  const { ListEntries, delEntry, isLoading } = useContext(EntriesContext);
  const { AdminLogin } = useContext(AdminContext);
  const history = useHistory();

  useEffect(() => {}, [ListEntries]);

  return (
    <section id="one">
      <h2>All Entries</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="one_container">
          <div className="cards">
            {typeof ListEntries !== "undefined" && ListEntries.length > 0
              ? ListEntries.map((e, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="card_title">{e.title}</div>
                      <div className="update">{e.updatedAt.slice(0, 10)}</div>
                      <div className="snippet">{e.snippet}</div>
                      <div className="card_text">{e.body.slice(0, 250)}...</div>
                      <div className="botonera">
                        <button
                          id="delete"
                          onClick={() => history.push(`/entry/${e._id}`)}
                        >
                          Read More
                        </button>

                        {AdminLogin ? (
                          <div style={{ display: "inline-block" }}>
                            <button id="delete" onClick={() => delEntry(e._id)}>
                              Delete
                            </button>
                            <button
                              id="edit"
                              onClick={() =>
                                history.push(`/editEntry/${e._id}`)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <hr />
                    </div>
                  );
                })
              : "nothing yet"}
          </div>
        </div>
      )}
    </section>
  );
};

export default EntriesCards;
