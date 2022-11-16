"use strict";

/**
 * 
 * @param {*} 
 * @returns 
 */

const UserFeedbackPage = ({currentUser, 
    pagesToShow,
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness,
    businesses,
    setBusinesses,
    feedbackType,
    setFeedbackType,
    showComments,
    setShowComments,
}) => {
    console.log("CURRENT USER FROM USER FEEDBACK PAGE: ", currentUser);
    console.log("CURRENT BUSINESS FROM USER FEEDBACK PAGE: ", currentBusiness);

    React.useEffect(() => {
        async function getUserFeedbacksOnMount() {
            // const {id} = currentUser;
            const id = currentUser?.id;
            const result = await Api.getUserFeedbacks({id});
            console.log("RESULT FEEDBACKS FROM USER FEEDBACK: ", result);

            if (result) {
                setBusinesses(result);
            }
        }
        getUserFeedbacksOnMount();
        // added cleanup fcn to fix bug where leaving this page for the home page caused errors
        return () => {
            setBusinesses([]);
        }
    }, [currentUser, showComments]);

    React.useEffect(() => {
        setFeedbackType('user');
        return () => {
            setFeedbackType('null');
        }
    }, []);

    React.useEffect(() => {
        setShowComments(true);
        return () => {
            setShowComments(false);
        }
    }, []);

    // console.log("SHOW COMMENTS FROM USERFEEDBACKPAGE: ", showComments);


    if (!currentUser) {
        return <p>You must be logged in to see this page!</p>
    }
    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <div>{`UserFeedbackPage for user: ${currentUser.id}, username: ${currentUser.username}`}</div>

            <CardList businesses={businesses}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentBusiness={currentBusiness}
                setCurrentBusiness={setCurrentBusiness}
                feedbackType={feedbackType}
                setFeedbackType={setFeedbackType}
                showComments={showComments}
                setShowComments={setShowComments}
            />
        </>
    )
}