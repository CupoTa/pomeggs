import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GetstartedPage from './pages/GetstartedPage'
import DashboardPage from './pages/DashboardPage'
import NotFound from './pages/NotFound'
import { Layout } from './components/Layout'


function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<DashboardPage />} />
                <Route path=":ref" element={<DashboardPage />} />
                <Route path="getstarted" element={<GetstartedPage />} />
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>

    );
}

export default App;
