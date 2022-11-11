"use strict";

const BusinessDetailsPage = ({currentBusiness, 
    setCurrentBusiness,
    handleSetPagesToShow,
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
            <DetailsCard currentBusiness={currentBusiness}/>
            <button onClick={(evt) => {handleSetPagesToShow(evt, 'feedbackFormPage')}}
                className="btn btn-outline-primary"
            >
                Give Feedback
            </button>
        </>
    )
}