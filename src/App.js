import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/common/PrivateRoutes';
import PodcastDetailsPage from './pages/PodcastDetails';
import PodcastsPage from './pages/Podcasts';
import CreateAPodcastPage from './pages/CreateAPodcast';
import ProfilePage from './pages/Profile';
import CreateAnEpisodePage from './pages/CreateAnEpisode';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubSnap = onSnapshot(
          doc(db, 'users', user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log('Error fetching user data:', error);
          }
        );

        return () => {
          unsubSnap();
        }
      }
    });
    return authUnsub();
  },[]); 

  return (
    <div className="App">
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="dark" 
      />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />} >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/create-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route path="/podcast/:id/create-episode"
            element={<CreateAnEpisodePage />} />
          </Route>  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
