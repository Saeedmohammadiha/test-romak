import { useEffect, useState } from 'react';
import { instanceAxios } from '../instanceAxios';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import styles from './table1.module.css';

export default function Table2() {
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'id' },
    { field: 'title' },
    { field: 'price' },
  ]);

  useEffect(() => {
    instanceAxios
      .get('/products')
      .then((response) => {
        setRowData(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Link to="/table1" className={styles.link}>
        HTML Table
      </Link>
      <h2>Table Ag Grid</h2>
      <div
        className="ag-theme-alpine"
        style={{ height: '100vh', width: 800, margin: 'auto' }}
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            filter: true,
            sortable: true,
            floatingFilter: true,
          }}
          rowData={rowData}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </>
  );
}
