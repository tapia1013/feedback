import { createContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10
    }
  ]);


  // delete a feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // set the feedback with a new array and filter out selected feedback
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  return (
    <FeedbackContext.Provider value={{
      feedback: feedback,
      deleteFeedback: deleteFeedback
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}


export default FeedbackContext;
