import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import './Data.css'

function Data() {
  const [datas, setDatas] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [exp, setExp] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        limit: 20,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      setDatas(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortChangeExp = (e) => {
    setExp(e.target.value);
  };

  const sortExp = () => {
    if (exp === "0<5") {
      return datas && datas.jdList.filter(item => item.maxExp <= 5);
    } else if (exp === "5>20") {
      return datas && datas.jdList.filter(item => item.maxExp > 5 && item.maxExp <= 20);
    } else {
      return datas && datas.jdList;
    }
  };

  const sortData = () => {
    if (sortBy === "remote") {
      return datas && datas.jdList.filter(item => item.location === "remote");
    } else if (sortBy === "onsite") {
      return datas && datas.jdList.filter(item => item.location !== "remote");
    } else {
      return datas && datas.jdList;
    }
  };

  return (
    <>
      <div className="container"> 
        <div className="sort-options location">
          <label>
            Sort By Location :-
            <select value={sortBy} onChange={handleSortChange}>
              <option value="">All</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>
          </label>
        </div>
        <div className="sort-options exp">
          <label>
            Sort By Exp :-
            <select value={exp} onChange={handleSortChangeExp}>
              <option value="">All</option>
              <option value="0<5">0 to 5</option>
              <option value="5>20">5 to 20</option>
            </select>
          </label>
        </div>
      </div>
    
      <div className="main">
        {sortData() && sortExp() && sortData().filter(item => sortExp().includes(item)).map((item, index) => (
          <div key={index}>
            <Cards datas={item}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default Data;
