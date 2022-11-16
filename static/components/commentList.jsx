"use strict";

const CommentList = ({business}) => {
    return (
        <>
            <p ></p>
            {business.feedbacks.map((feedback) => (
                <>
                    <Comment key={business.id}
                        business={business}
                        feedback={feedback}
                        // pagesToShow={pagesToShow}
                        // setPagesToShow={setPagesToShow}
                        // currentBusiness={currentBusiness}
                        // setCurrentBusiness={setCurrentBusiness}
                        // feedbackType={feedbackType}
                        // setFeedbackType={setFeedbackType}
                        // showComments={showComments}
                        // setShowComments={setShowComments}
                    />
                </>
            ))}
        </>
    );
}