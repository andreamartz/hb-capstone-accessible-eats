"use strict";

const BusinessDetailsPage = ({currentBusiness, 
    setCurrentBusiness,
    handleSetPagesToShow,
    pagesToShow,
    setPagesToShow,
    feedbackType,
    setFeedbackType,
}) => {
    React.useEffect(() => {
        return () => {
            setCurrentBusiness(null);
        }
    }, []);

    // const handleDetailsCardClick = () => {
    //     const targetPage = 'feedbackFormPage';

    //     for (const page in pagesToShow) {
    //         newPagesToShow[page] = page === targetPage ? true : false;
    //     }
    //     setPagesToShow(newPagesToShow);
    // }

    return (
        <>
            {/* <DetailsCard currentBusiness={currentBusiness}/> */}
            <Card business={currentBusiness} 
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow} 
                setCurrentBusiness={setCurrentBusiness}
                feedbackType={feedbackType}
                setFeedbackType={setFeedbackType}
            />
            <button onClick={(evt) => {handleSetPagesToShow(evt, 'feedbackFormPage')}}
                className="btn btn-outline-primary"
            >
                Give Feedback
            </button>
        </>
    )
}