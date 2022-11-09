"use strict";

const UserFeedbackPage = ({currentUser, 
    pagesToShow,
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness,
    businesses,
    setBusinesses
}) => {
    console.log("CURRENT USER FROM USER FEEDBACK: ", currentUser);
    React.useEffect(() => {
        async function getUserFeedbacksOnMount() {
            // const {id} = currentUser;
            const id = currentUser?.id;
            const result = await Api.getUserFeedbacks({id});
            console.log("RESULT FEEDBACKS: ", result);

            if (result) {
                setBusinesses(result);
            }
        }
        getUserFeedbacksOnMount();
    }, [currentUser]);

    if (!currentUser) {
        return <p>You must be logged in to see this page!</p>
    }
    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <div>UserFeedbackPage</div>

            <CardList businesses={businesses}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentBusiness={currentBusiness}
                setCurrentBusiness={setCurrentBusiness}
            />
        </>
    )
}