import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './components/pages/AboutPage';
import { FeedbackProvider } from './context/FeedbackContext';

import FeedbackData from './data/FeedbackData';


const App = () => {
  const [feedback, setFeedback] = useState(FeedbackData);

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();

    // get all feedback already there with spread but add the new feedback before it so it can show ontop
    setFeedback([newFeedback, ...feedback]);
  }



  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList />
                </>
              }>
            </Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
};

export default App;

