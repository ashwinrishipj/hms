import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Search(props) {
  const [show, setShow] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  const intializeSearchContent = (e) => {
    setSearchContent(e.target.value);
  };

  const validateSearch = (event) => {
    event.preventDefault();
    if (searchContent !== "") {
      props.displayImages(searchContent);
    } else {
      alert("enter some data");
    }
  };

  return (
    <React.Fragment>
      {show ? (
        <>
        <form
          className="form-inline input-wrapper"
          onSubmit={(e) => validateSearch(e)}
        >
          <input
            className="form-control input-wrapper"
            placeholder="Search Content"
            aria-label="Search"
            onChange={(e) => intializeSearchContent(e)}
          />
        </form>
         <Button variant="outline-info ml-2" onClick={() => setShow(!show)}>close</Button>
         </>
      ) : (
        <li className="nav-item ml-4" name="blogs" onClick={() => setShow(!show)}>
          <a className="nav-link pointer fa fa-fw fa-search text-light" href>
            Search
          </a>
        </li>
      )}
    </React.Fragment>
  );
}

export default Search;
