import React, { createContext, useReducer, useEffect, useState } from "react";

export const EntriesContext = createContext();

const entriesReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ListEntries: action.datas };
    default:
      return state;
  }
};

const EntriesContextProvider = (props) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  const [{ ListEntries }, dispatch] = useReducer(entriesReducer, {
    ListEntries: [],
  });

  useEffect(() => {
    setIsLoading(true)
    fetch("https://tangoblogging.herokuapp.com/allBlogs")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT", datas: data }))
      .then(()=> setIsLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const reload = () => {
    setIsLoading(true)
    fetch("https://tangoblogging.herokuapp.com/allBlogs")
    .then((response) => response.json())
    .then((data) => dispatch({ type: "INIT", datas: data }))
    .then(()=> setIsLoading(false))
    .catch((err) => console.log(err));
  }

  const findString = (text) => {
    const listSelected = ListEntries.filter((item,index) => {
      return item.body.indexOf(text) !== -1 || item.title.indexOf(text) !==-1 || item.snippet.indexOf(text) !== -1
    })
    return listSelected
  }

  const addEntry = (blogentry) => {
    const blog = JSON.stringify(blogentry)
    fetch('https://tangoblogging.herokuapp.com/createBlog', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: blog
    })
    .then(()=> reload())
    .catch(err => console.log(err))
  }

  const delEntry = (blog_id) => {
    fetch(`https://tangoblogging.herokuapp.com/deleteEntry/${blog_id}`, {
      method: 'DELETE',
    })
    .then(()=> reload())
    .catch(err=> {
      console.log(err);
    })
  }

  const editEntry = (entry) => {
    const parseEntry = JSON.stringify(entry)
    fetch('https://tangoblogging.herokuapp.com/editEntry', {
      method: 'POST',
      cors: 'cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: parseEntry,
    }).then(response => console.log(response))
    .then(()=> reload())
    .catch(err => {
      console.log(err);
    })
  }

  


  return (
    <EntriesContext.Provider value={{ListEntries, addEntry, findString, search, setSearch, delEntry, editEntry, isLoading}}>
      {props.children}
    </EntriesContext.Provider>
  );
};

export default EntriesContextProvider;
