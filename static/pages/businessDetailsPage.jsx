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

    React.useEffect(() => {
        // function to get business details from dtbs with aggregated feedback
        const {id, yelp_id} = currentBusiness;
        // setCurrentBusiness(null);
        async function getBusinessDetailsOnMount() {
            setLoading(true);
            const result = await Api.getBusinessDetails({id, yelp_id});

            if (result) {
                setCurrentBusiness(result);
                setLoading(false);
            }
        }
        getBusinessDetailsOnMount();
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
                className="btn btn-outline-primary mb-3"
            >
                Give Feedback
            </button>
            <CommentList business={currentBusiness}/>
        </>
    )
}