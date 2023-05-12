import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Console from "./pages/Console";
import Error from "./pages/Error"
import { AuthProvider } from "./contexts/AuthProvider";

const App = () => {
    return (
        <Router id="base">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/console/*" element={<Console />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
export default App