

import { useEffect, useState } from "react";
import Donation from "./Donation";
import './ListDonates.css';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function ListDonates({ arr, coins, getFromLocalStorage }) {
  const [option, setOption] = useState("sort"); // אפשרות המיון הנבחרת
  const [sortedArr, setSortedArr] = useState(arr); // מערך ממויין להצגה
  const [searchValue, setSearchValue] = useState(""); // ערך החיפוש

  // מיון הרשימה בהתאם לאפשרות שנבחרה
  useEffect(() => {
    let sorted = [...sortedArr]; // עבודה על עותק של המערך הממוין
    if (option === "old") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); // מיון לפי תאריך ישן
    } else if (option === "new") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // מיון לפי תאריך חדש
    } else if (option === "amount donation") {
      sorted.sort((a, b) => b.sum - a.sum); // מיון לפי סכום התרומה
    }
    setSortedArr(sorted);
  }, [option, sortedArr]);

  // שינוי אפשרות המיון
  function handleSortChange(e) {
    setOption(e.target.value);
  }

  // חיפוש תרומות לפי שם או הקדשה
  function search(e) {
    let parameter = e.target.value.toLowerCase();
    let donation = arr.filter(item => 
      item.name.toLowerCase().includes(parameter) || item.dedication.toLowerCase().includes(parameter));
 
      setSortedArr(donation);
    setSearchValue(e.target.value);
  }

  // איפוס תוצאות החיפוש
  function reset() {
    setSortedArr(getFromLocalStorage());
    setSearchValue("");
  }

  return (
    <>
      <select value={option} onChange={handleSortChange}>
        <option value="sort" disabled>מיין לפי</option>
        <option value="old">ישן</option>
        <option value="new">חדש</option>
        <option value="amount donation">גובה התרומה</option>
      </select>

      <input 
        type="text" 
        value={searchValue} 
        placeholder="הקלד שם או הקדשה לחיפוש" 
        onChange={search} 
      />
      <Button size="small" onClick={reset} startIcon={<ClearIcon />}>איפוס</Button>

      <ul>{sortedArr.map((item, index) => <li key={index}><Donation donate={item} coins={coins} /></li>)}</ul>
    </>
  );
}

export default ListDonates;




