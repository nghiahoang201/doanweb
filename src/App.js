import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./Component/Page/Home";
import HomeAdmin from "./Admin/Page/Home";
import AdminClock from "./Admin/Page/Clock";
import CheckOut from "./Component/Page/CheckOut";
import Login from "./Admin/Page/Login";
import LayoutAdmin from "./Admin/Layout";
import Brand from "./Admin/Page/Brand";
import Order from "./Admin/Page/Order";
import paths from "./paths/paths";
import SliderAdmin from "./Admin/Page/Banner";
import UserAdmin from "./Admin/Page/UserAdmin";
import CheckLogin from "./helpek/CheckLogin";
function App() {
  return (
    <BrowserRouter>
      <Route exact path={[paths.home, paths.clockHome]}>
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route exact path={paths.checkout}>
        <Layout type="noLayout">
          <CheckOut />
        </Layout>
      </Route>
      <Route exact path={paths.login}>
        <Login />
      </Route>
      {/* admin router */}
      <Route exact path={paths.user}>
        <CheckLogin>
          <LayoutAdmin>
            <UserAdmin />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
      <Route exact path={paths.admin}>
        <CheckLogin>
          <LayoutAdmin>
            <HomeAdmin />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
      <Route exact path={paths.brand}>
        <CheckLogin>
          <LayoutAdmin>
            <Brand />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
      <Route exact path={paths.clock}>
        <CheckLogin>
          <LayoutAdmin>
            <AdminClock />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
      <Route exact path={paths.banner}>
        <CheckLogin>
          <LayoutAdmin>
            <SliderAdmin />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
      <Route exact path={paths.order}>
        <CheckLogin>
          <LayoutAdmin>
            <Order />
          </LayoutAdmin>
        </CheckLogin>
      </Route>
    </BrowserRouter>
  );
}

export default App;
