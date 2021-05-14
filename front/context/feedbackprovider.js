import React, { useState } from 'react';

import { FeedbackContext } from './logincontext';

const FeedbackProvider = ({ children }) => {
    const [FeedbackList, setFeedbackList] = useState(false);

    return (
        <FeedbackContext.Provider value={{ FeedbackList, setFeedbackList }}>
            {children}
        </FeedbackContext.Provider>
    )
};

export default FeedbackProvider;