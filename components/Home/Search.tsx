"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  value?: string;
}

const Search: React.FC<SearchProps> = ({ value = "" }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/shop"); // fallback to default list
    }
  };

  return (
    <div className="hero__search">
      <div className="hero__search__form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What do you need?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ color: "#000" }}
          />
          <button type="submit" className="site-btn">
            SEARCH
          </button>
        </form>
      </div>
      <div className="hero__search__phone d-lg-block d-none">
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
