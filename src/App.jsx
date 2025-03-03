
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Campaign from './Campaign';
import ListDonates from './ListDonates';
import AddDonate from './AddDonate';
import NavBar from './NavBar';

function App() {
  let navigate = useNavigate(); // כלי לניווט בין עמודים
  const [donors, setDonors] = useState(getFromLocalStorage()); // רשימת התורמים (state)
  const [coins, setCoins] = useState({ type: "₪", dollarRate: 3.5 }); // נתוני המטבע

  // ביצוע ניווט לעמוד הראשי בעת עליית הקומפוננטה
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  // עדכון שער הדולר מה-API בזמן עליית הקומפוננטה
  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/ef8e1a4bf250d9aadabcf604/latest/USD")
      .then(res => res.json())
      .then(data => {
        setCoins({ ...coins, dollarRate: data.conversion_rates.ILS }); // עדכון שער הדולר
      })
      .catch(err => console.log(`err: ${err.message}`));
  }, []);

  // טעינת רשימת התורמים מה-localStorage
  function getFromLocalStorage() {
    let donors = localStorage.getItem("donors");
    donors = JSON.parse(donors);
    if (!donors) {
      donors = [];
      localStorage.setItem("donors", JSON.stringify(donors));
    } else {
      donors = donors.map(donor => {
        donor.date = new Date(donor.date); // המרת מחרוזת תאריך לאובייקט Date
        return donor;
      });
    }
    return donors;
  }

  // פונקציה להוספת תרומה חדשה
  function addDonation(donation) {
    donation.date = new Date(); // הוספת תאריך תרומה
    let copy = [...donors, donation];
    setDonors(copy); // עדכון הרשימה ב-state
    localStorage.setItem("donors", JSON.stringify(copy)); // שמירת התרומה ב-localStorage
  }

  // שינוי סוג המטבע
  function coinType(e) {
    let copy = { ...coins, type: e.target.value };
    setCoins(copy);
  }

  return (
    <>
      <div className="radio-buttons-container">
        <label htmlFor="shekel">שקל</label>
        <input type="radio" id="shekel" name="type" value="₪" onChange={coinType} />
        <label htmlFor="dollar">דולר</label>
        <input type="radio" id="dollar" name="type" value="$" onChange={coinType} />
      </div>
      <NavBar />

      <Routes>
        {/* עמוד הבית */}
        <Route path='/' element={
          <div style={{
            padding: "20px",
            backgroundColor: "#e1f7d5",
            marginTop: "50px",
            borderRadius: "8px"
          }}>
            <h1>קופת העיר</h1>
          </div>} />

        {/* עמוד רשימת התרומות */}
        <Route path="list" element={
          <ListDonates arr={donors} coins={coins} getFromLocalStorage={getFromLocalStorage} />} />

        {/* עמוד הוספת תרומה */}
        <Route path="add" element={<AddDonate add={addDonation} coins={coins} />} />
      </Routes>

      {/* רכיב שמציג את סטטוס הקמפיין */}
      <Campaign arr={donors} coins={coins} />
    </>
  );
}

export default App;
