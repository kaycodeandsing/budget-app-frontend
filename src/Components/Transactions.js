import { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/transactions`).then((res) => {
     setTransactions(res.data);
   });
    //  fetch(`${process.env.REACT_APP_URL}/bookmarks`)
    //    .then((res) => res.json())
    //   .then((data) => {
    //      setBookmarks(data);
    //    });
  }, []);
  
  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
