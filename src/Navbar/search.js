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
        <form
          className="form-inline input-wrapper ml-4"
          onSubmit={(e) => validateSearch(e)}
        >
          <input
            className="form-control input-wrapper"
            placeholder="Search Images"
            aria-label="Search"
            onChange={(e) => intializeSearchContent(e)}
          />
         <Button variant="outline-info" onClick={() => setShow(!show)}>close</Button>
        </form>
      ) : (
        <li className="nav-item ml-4" name="blogs" onClick={() => setShow(!show)}>
          <a className="nav-link pointer fa fa-fw fa-search " href>
            Search
          </a>
        </li>
      )}
    </React.Fragment>
  );
}

export default Search;
