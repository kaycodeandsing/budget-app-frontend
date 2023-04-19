import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionNewForm() {
  const [transaction, setTransaction] = useState({
    itemName: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });
  const navigate = useNavigate();
  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, isFavorite: !transaction.isFavorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_API_URL)
    axios
    .post(`${process.env.REACT_APP_API_URL}/transactions`, transaction) // localhost:3000/transactions
    .then(()=>{
      navigate("/transactions"); //index page
    })
    .catch((e)=>{
      console.log(e); 
    });
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name:</label>
        <input
          id="name"
          value={transaction.itemName}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Transaction"
          required
        />
        <label htmlFor="url">Amount:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={transaction.amount}
          placeholder="Dollar amount $"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Date:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={transaction.date}
          placeholder="mm/dd/yyyy"
          onChange={handleTextChange}
        />
         <label htmlFor="category">From:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={transaction.from}
          placeholder="ie. employer, bank, pet store"
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={transaction.isFavorite}
        />
        <label htmlFor="description">Category:</label>
        <textarea
          id="description"
          name="description"
          value={transaction.category}
          onChange={handleTextChange}
          placeholder="Income, savings, pets, food, etc"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default TransactionNewForm;
