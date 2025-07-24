import {Suspense, lazy} from "react";
import "./App.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

const DashboardLayout = lazy(() => import("./features/dashboard/DashboardLayout"));
const DashboardPage = lazy(() => import("./features/dashboard/components/DashboardPage"));
const SettingsPage = lazy(() => import("@/features/dashboard/pages/DashboardSettings"));

function App() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<DashboardLayout/>}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path="settings" element={<SettingsPage/>}/>
                    </Route>

                    <Route path="/" element={<Navigate to="/dashboard/settings"/>}/>
                    <Route path="*" element={<div>404 Not Found</div>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
