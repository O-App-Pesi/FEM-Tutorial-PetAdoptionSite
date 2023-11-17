import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import AdoptedPetContext from "./adoptedPetContext";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const { id } = useParams();
    //if the array is not in the cache, runs fetchPet to grab data 
    const results = useQuery(["details", id], fetchPet);

    //`isLoading` is for the first load `isFetching` is for refetching.
    //shows something while fetchPet is happening:
    if (results.isLoading) {
        return (
            <div className="loading-page">
                <h2 className="loader">😵‍💫</h2>
            </div>
        )
    }
    //response from API
    const pet = results.data.pets[0];


    return ( 
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}>Yes</button>
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                ) : null}
                </h2>
            </div>
        </div>
     );
}

function DetailsErrorBoundary() {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}
 
export default Details;