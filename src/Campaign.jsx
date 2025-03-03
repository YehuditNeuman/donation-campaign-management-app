
import { useEffect, useState } from "react";
import "./Campaign.css";
import { fromShekelToDollar } from "./Utils";

function Campaign({ arr, coins }) {
  const target = 1000000; // יעד התרומות בקמפיין
  const [summaryDonationsNow, setSummaryDonationsNow] = useState(0.0); // סך התרומות שנאספו
  const [percentageDonationsFromTarget, setPercentageDonationsFromTarget] = useState(0); // אחוז ההגעה ליעד
  // const [Donors, setDonors] = useState(arr.length); // מספר התורמים
let Donors=arr.length;
  useEffect(() => {
   // setDonors(arr.length); // עדכון מספר התורמים
    let totalSum = arr.reduce((sum, donor) => sum + parseInt(donor.sum), 0); // חישוב סך התרומות
    setSummaryDonationsNow(totalSum);
    setPercentageDonationsFromTarget(((totalSum / target) * 100).toFixed(3)); // חישוב אחוז ההגעה ליעד
  }, [arr, coins]); // עדכון בכל שינוי ברשימת התרומות או סוג המטבע

  return (
    <> 
      <div id="cont">
        <div id="details">
          <h3>{`תורמים : ${Donors}`}</h3> 
          <h3>
            {coins.type === "$"
              ? `${coins.type} עד כה : ${fromShekelToDollar(summaryDonationsNow, coins.dollarRate, coins.type)}`
              : `${coins.type} עד כה : ${summaryDonationsNow}`}
          </h3>
          <h3>{`הושגו מתוך היעד : % ${percentageDonationsFromTarget}`}</h3>
          <h3>
            {coins.type === "$"
              ? `${coins.type} היעד : ${fromShekelToDollar(target, coins.dollarRate, coins.type)}`
              : `${coins.type} היעד : ${target}`}
          </h3>
        </div>
        <img src="./src/images/logo_m-1007x1024.png" alt="" /> 
      </div>
    </>
  );
}

export default Campaign;
