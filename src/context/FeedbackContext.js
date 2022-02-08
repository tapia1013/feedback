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
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback]);
  }

  // Delete a feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE'
      })

      // set the feedback with a new array and filter out selected feedback
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Func To Update Context feedback Edit, gets(ID, NEW DATA)
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json();

    setFeedback(feedback.map((item) => item.id === id
      ? { ...item, ...data }
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
