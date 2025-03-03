


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fromDollarToShekel } from "./Utils";
import './AddDonate.css';

function AddDonate({ add, coins }) {
    const [newDaonation, setNewDaonation] = useState({ id: 0, name: "", dedication: "", sum: 0 });
    const [errors, setErrors] = useState({});
    let navig = useNavigate();

    // פונקציה לאימות נתוני הטופס
    function validate() {
        let errors = {};
        if (newDaonation.sum <= 0)
            errors.sum = "לא מתאפשרת תרומה בסכום הנוכחי";
        if (!newDaonation.name)
            errors.name = "חסר שם תורם, לא מתאפשרת תרומה אנונימית";
        if (newDaonation.sum > 1000000)
            errors.sum = "גבוה מדי, לא מתאפשרת תרומה בסכום הנוכחי";
        return errors;
    }

    // מחזירה ID ייחודי לתרומה החדשה
    function nextId() {
        let donors = JSON.parse(localStorage.getItem("donors"));
        if (!donors || donors.length === 0) {
            return 1; // אם אין תרומות קודמות, מתחילים ב-ID 1
        }
        return donors[donors.length - 1].id + 1; // מחזירה ID חדש על פי התרומה האחרונה
    }

    // שמירת התרומה החדשה
    function save(e) {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length == 0) {
            newDaonation.sum = fromDollarToShekel(newDaonation.sum, coins.dollarRate, coins.type); // המרת סכום לפי מטבע
            newDaonation.id = nextId(); // הגדרת ID לתרומה
            add(newDaonation); // הוספת התרומה לרשימת התרומות

            // איפוס הטופס
            setNewDaonation({
                name: "",
                dedication: "",
                sum: 0,
                id: nextId() + 1
            });

            navig("/list"); // ניווט לעמוד רשימת התרומות
        }
        setErrors(errors); // שמירת הודעות השגיאה (אם קיימות)
    }

    // ניהול שינויים בשדות הטופס
    function change(e) {
        let { value, name } = e.target;
        let copy = { ...newDaonation };
        copy[name] = value;
        setNewDaonation(copy);
    }

    return (
        <form onSubmit={save}>
            <label>שם התורם</label>
            {errors.name && <div style={{ backgroundColor: "red", color: "white" }}>{errors.name}</div>}
            <input type="text" value={newDaonation.name} name="name" onChange={change} />

            <label>הקדשה</label>
            <input type="text" value={newDaonation.dedication} name="dedication" onChange={change} />

            <label>סכום לתרומה</label>
            {errors.sum && <div style={{ backgroundColor: "red", color: "white" }}>{errors.sum}</div>}
            <input type="number" value={newDaonation.sum} name="sum" step="100" onChange={change} />

            <input type="submit" />
        </form>
    );
}

export default AddDonate;
