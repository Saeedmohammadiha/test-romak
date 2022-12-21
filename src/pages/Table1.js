import styles from './table1.module.css';
import { instanceAxios } from '../instanceAxios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Table1() {
  const [products, setProducts] = useState();

  useEffect(() => {
    instanceAxios
      .get('/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Link to="/table2" className={styles.link}>
        Table Ag Grid
      </Link>
      <h2>HTML Table</h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Price</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            return (
              <tr key={product.id} className={styles.tr}>
                <td className={styles.td}>{product.id}</td>
                <td className={styles.td}>{product.title}</td>
                <td className={styles.td}>{product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
