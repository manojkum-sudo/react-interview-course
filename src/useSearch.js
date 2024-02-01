import { useState } from "react";

export const useSearch = (myObj) => {
  const [filterUser, setFilterUser] = useState([]);

  const handleSearch = (value) => {
    const filterRes = myObj.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterUser(filterRes);
  };

  return { handleSearch, filterUser };
};

// TODO
// 1. Data set/get localStorage
// 2. Data delete

// Pending | Done

// status: 'pending' yes comple

// Input

// todo : [
//     {
//         id: Date.now(),
//         task: 'Eating banana',
//         isComplete: false
//     }
// ]
