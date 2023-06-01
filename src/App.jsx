import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/home/Home';
import RosterLayout from './components/rosterLayout/RosterLayout';
import RosterTeam from './pages/rosterTeam/RosterTeam';
import RecordGame from './pages/recordGame/recordGame';
import PostGame from './pages/postGame/PostGame';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="record-game" element={<RecordGame />} />
            <Route path="post-game" element={<PostGame />} />
            <Route path="roster" element={<RosterLayout />}>
                <Route path=":id" element={<RosterTeam />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
