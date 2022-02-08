import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

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

  // Func To Update Context feedback Edit, gets(ID, NEW DATA)
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id
      ? { ...item, ...updItem }
      : item
    ))
  }

  // Set Item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true
    })
  }


  return (
    <FeedbackContext.Provider value={{
      feedback: feedback,
      // feedbackEdit is the actual STATE in bool
      feedbackEdit: feedbackEdit,
      // isLoding ?
      isLoading: isLoading,
      // Func To DELETE Feedback
      deleteFeedback: deleteFeedback,
      // FUNC to add Feedback
      addFeedback: addFeedback,
      // FUNC to EditFeedback
      editFeedback: editFeedback,
      // FUNC to update Feedback, after editfeedback
      updateFeedback: updateFeedback,
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}


export default FeedbackContext;
