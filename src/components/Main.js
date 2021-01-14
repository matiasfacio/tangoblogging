import React, { useContext, useEffect } from "react";
import { Link, Switch, Route, Redirect, useHistory } from "react-router-dom";
import DisplayOneEntry from "./DisplayOneEntry";
import Home from "./Home";
import NewEntry from "./NewEntry";
import Search from "./Search";
import { EntriesContext } from "../contexts/EntriesContext";
import { AdminContext } from "../contexts/AdminContext";
import Loggin from "./Loggin";
import EditEntry from "./EditEntry";

const Main = () => {
  const { search, setSearch } = useContext(EntriesContext);
  const { AdminLogin, setAdminLogin } = useContext(AdminContext);
  const history = useHistory();

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div className="App">
      <nav>
        <ul>
          <Link to="/">Blog</Link>
          <Link to="/newentry">New Entry</Link>
          {AdminLogin ? <Link to="/Admin">Admin</Link> : ""}
          {AdminLogin ? (
            <button id="button_log_out" onClick={() => setAdminLogin(false)}>
              Logout
            </button>
          ) : (
            <button id="button_log_out" onClick={() => history.push("/login")}>
              Login
            </button>
          )}
          <form
            id="formSearch"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch("");
            }}
          >
            <input
              type="search"
              placeholder="search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </ul>
        <div className="title">
          <h1>Matias Facio</h1>
        </div>
      </nav>
      <header>
        <div className="text_header">
          Matias Facio's Blog, <br />
          welcome!
        </div>
      </header>

      {search.length !== 0 ? <Redirect to={`/search/${search}`} /> : ""}

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Loggin />
        </Route>
        <Route path="/newentry">
          <NewEntry />
        </Route>
        <Route path="/Admin">
          <Loggin />
        </Route>

        <Route exact path="/search/:query" children={<Search />} />
        <Route exact path="/entry/:id" children={<DisplayOneEntry />} />
        <Route exact path="/editEntry/:id" children={<EditEntry />} />
      </Switch>
    </div>
  );
};

export default Main;
