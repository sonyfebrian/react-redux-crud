import { Route, Routes } from "react-router-dom";
import Layout from "modules/pages/components/Layout";
import ItemCardUser from "modules/features/components/ItemCardUser";

function App() {
  return (
    <div>
      <Layout>
        {" "}
        <Routes>
          <Route path="/" element={<ItemCardUser />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
