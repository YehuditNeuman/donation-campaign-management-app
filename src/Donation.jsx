

import { fromShekelToDollar } from "./Utils";
import './Donation.css';

function Donation({ donate, coins }) {
  function calcTimeOver() {
    let time = new Date() - donate.date; // חישוב הזמן שעבר מאז התרומה
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    if (days >= 1) return `לפני ${days} ימים`;

    let hours = Math.floor(time / (1000 * 60 * 60));
    if (hours >= 1) return `לפני ${hours} שעות`;

    let minutes = Math.floor(time / (1000 * 60));
    return `לפני ${minutes} דקות`;
  }

  let newSum = fromShekelToDollar(donate.sum, coins.dollarRate, coins.type); // המרת סכום התרומה לפי סוג המטבע

  return (
    <>
      <h2>{donate.id}</h2>
      <h2>{donate.name}</h2>
      <h2>{donate.dedication}</h2>
      <h2>{`${coins.type} ${newSum}`}</h2>
      <h2>{calcTimeOver()}</h2>
    </>
  );
}

export default Donation;
