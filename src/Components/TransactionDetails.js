import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams(); // getting index from url
  let navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
    .then((response) => {
        console.log(response)
        setTransaction(response.data);
    })
    .catch(() => {
      navigate("/not-found");
    });
  }, [index,navigate]);
  const handleDelete = () => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
    .then(() => {
      navigate("/transactions");
    });
};
  return (
    <article>
      <h3>
        {transaction.isFavorite ? <span>⭐️</span> : null} {transaction.itemName}
      </h3>
      <h5>
        <span>
          <a href={transaction.itemName}>{transaction.amount}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {transaction.itemName}
      </h5>
      <h6>{transaction.from}</h6>
      <p>{transaction.category}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
