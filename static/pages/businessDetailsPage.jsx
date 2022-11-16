"use strict";

const BusinessDetailsPage = ({currentBusiness, 
    setCurrentBusiness,
    handleSetPagesToShow,
    pagesToShow,
    setPagesToShow,
    feedbackType,
    setFeedbackType,
    showComments,
    setShowComments,
}) => {
    const [loading, setLoading] = React.useState(false);
    console.log("CURRENT BUSINESS FROM BUSINESS DETAILS PAGE: ", currentBusiness);

    React.useEffect(() => {
        // function to get business details from dtbs with aggregated feedback
        const {id, yelp_id} = currentBusiness;
        // setCurrentBusiness(null);
        // console.log("BUSINESS IDENTIFIERS: ", business_identifiers);
        async function getBusinessDetailsOnMount() {
            setLoading(true);
            const result = await Api.getBusinessDetails({id, yelp_id});

            if (result) {
                setCurrentBusiness(result);
                setLoading(false);
            }
        }
        getBusinessDetailsOnMount();
        // cleanup function
        return () => {
            setCurrentBusiness(null);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <Card business={currentBusiness} 
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow} 
                handleSetPagesToShow={handleSetPagesToShow}
                setCurrentBusiness={setCurrentBusiness}
                feedbackType={feedbackType}
                setFeedbackType={setFeedbackType}
                showComments={showComments}
                setShowComments={setShowComments}
            />
            <button onClick={(evt) => {handleSetPagesToShow(evt, 'feedbackFormPage')}}
                className="btn btn-outline-primary"
            >
                Give Feedback
            </button>
            <CommentList business={currentBusiness} />
        </>
    )
}