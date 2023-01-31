import { Route, Routes } from "react-router-dom";
import Layout from "modules/pages/components/Layout";
import ItemCardUser from "modules/pages/components/ItemCardUser";
import UserTable from "modules/pages/components/table/UserTable";
import FormCreate from "modules/details/components/FormCreate";
function App() {
  return (
    <div>
      <Layout>
        {" "}
        <Routes>
          <Route path="/" element={<UserTable />}></Route>
          <Route path="/add-user" element={<FormCreate />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
