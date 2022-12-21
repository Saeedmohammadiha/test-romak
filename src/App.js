import Login from './login/Login';
import PrivateRoute from './PrivateRoute';
import Table1 from './pages/Table1';
import Table2 from './pages/Table2';
import { Route, Navigate, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/table1"
          element={
            <PrivateRoute>
              <Table1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/table2"
          element={
            <PrivateRoute>
              <Table2 />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    /* <PrivateRoute path="/table1" element={<Table1 />} />
        <PrivateRoute path="/table2" element={<Table2 />} /> */
    // <Route exact path="/table1" element={<PrivateRoute />}>
    //   <Route exact path="/table1" element={<Table1 />} />
    // </Route>
    // <Route exact path="/table2" element={<PrivateRoute />}>
    //   <Route exact path="/table2" element={<Table2 />} />
    // </Route>
  );
}

export default App;
