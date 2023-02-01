import { Route, Routes } from "react-router-dom";
import Layout from "modules/pages/components/Layout";
import UserTable from "modules/pages/components/table/UserTable";
import FormCreate from "modules/details/components/FormCreate";
import FormEdit from "modules/details/components/FormEdit";
function App() {
  return (
    <div>
      <Layout>
        {" "}
        <Routes>
          <Route path="/" element={<UserTable />}></Route>
          <Route path="/create" element={<FormCreate />}></Route>
          <Route path="/edit-user/:id" element={<FormEdit />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
