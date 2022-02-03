import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';

import FeedbackData from './data/FeedbackData';


const App = () => {
  const [feedback, setFeedback] = useState(FeedbackData);

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();

    // get all feedback already there with spread but add the new feedback before it so it can show ontop
    setFeedback([newFeedback, ...feedback]);
  }

  // delete a feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // set the feedback with a new array and filter out selected feedback
      setFeedback(feedback.filter((item) => item.id !== id))
    }

  }

  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>

  );
};

export default App;

