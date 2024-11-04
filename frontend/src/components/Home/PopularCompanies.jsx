import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "CodeFreak",
      location: "Gulshan-1, Dhaka",
      openPositions: 10,
    },
    {
      id: 2,
      title: "BugBite",
      location: "Kalyanpur, Dhaka",
      openPositions: 5,
    },
    {
      id: 3,
      title: "Data Center",
      location: "Alonkar Mor, Chittagong",
      openPositions: 20,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
