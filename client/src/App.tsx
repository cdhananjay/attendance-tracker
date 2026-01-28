import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import DashboardPage from "@/pages/DashboardPage";
import RegisterPage from "@/pages/RegisterPage";
import SubjectsPage from "@/pages/SubjectsPage";
import TimetablePage from "@/pages/TimetablePage";
import ManualUpdatePage from "@/pages/ManualUpdatePage";
import ProtectedRoutes from "@/lib/ProtectedRoutes";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/login"} element={<LoginPage/>} />
                <Route path={"/register"} element={<RegisterPage/>} />
                <Route element={<ProtectedRoutes/>} >
                    <Route path={"/dashboard"} element={<DashboardPage/>} />
                    <Route path={"/"} element={<DashboardPage/>}/>
                    <Route path={"/subjects"} element={<SubjectsPage/>} />
                    <Route path={"/timetable"} element={<TimetablePage/>} />
                    <Route path={"/manualupdate"} element={<ManualUpdatePage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
