
// המרת סכום מדולר לשקל
export function fromDollarToShekel(sum, dollarRate, type) {
    if (type === "₪")
      return parseFloat((sum)); // אם המטבע הוא שקל, אין צורך בהמרה
    return parseFloat((sum * dollarRate).toFixed(3)); // המרה לשקלים לפי שער הדולר
  }
  
  // המרת סכום משקל לדולר
  export function fromShekelToDollar(sum, dollarRate, type) {
    if (type === "$")
      return parseFloat((sum / dollarRate).toFixed(3)); // המרה לדולרים לפי שער הדולר
    return parseFloat((sum).toFixed(3)); // אם המטבע הוא דולר, אין צורך בהמרה
  }
  