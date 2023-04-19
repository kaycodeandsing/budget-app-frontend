import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TransactionEditForm() {
  let { index } = useParams();

  const [transaction, setTransaction] = useState({
    itemName: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });
  let navigate = useNavigate();
  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, isFavorite: !transaction.isFavorite });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="Edit">
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
      <Link to={`/transactions/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
