"use client";
import React from "react";

const Search = () => {
  return (
    <div className="hero__search">
      <div className="hero__search__form">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="What do you need?" style={{color: "#000"}} />
          <button type="submit" className="site-btn">
            SEARCH
          </button>
        </form>
      </div>
      <div className="hero__search__phone">
        <div className="hero__search__phone__icon">
          <i className="fa fa-phone"></i>
        </div>
        <div className="hero__search__phone__text">
          <h5>+63 920 404 2919</h5>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
