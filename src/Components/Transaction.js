import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>
        {transaction.isFavorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <a href={transaction.amount} target="_blank" rel="noreferrer">
          {transaction.itemName}
        </a>
      </td>
      <td>
        <Link to={`/transactions/${index}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Transaction;
