import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./adoptedPetContext";
// import { useEffect } from "react";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
    //not totally immutable; const is a misnomer
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });
    // const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    // const [breed, setBreed] = useState("");
    // const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [adoptedPet] = useContext(AdoptedPetContext);

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];


    //REDUNDANT USEEFFECT EXAMPLE
    // useEffect(() => {
    //     requestPets();
    //     // the empty array stops it from re-loading
    //     // when the value changes
    // }, []);

    // async function requestPets() {
    //     const res = await fetch(
    //         `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    //     );
    //     const json = await res.json();

    //     setPets(json.pets);
    // }

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                // stops the form from submitting and just calls the function
                e.preventDefault();
                // requestPets();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                {/* LOCATION */}
                <label htmlFor="location">
                    Location
                    <input 
                        // onChange={e => setLocation(e.target.value)} 
                        // value={location} UseEffect
                        name="location"
                        id="location" 
                        placeholder="Location" />
                </label>
                {/* ANIMALS */}
                <label htmlFor="animal">
                    Animal
                    <select 
                        id="animal"
                        name="animal"
                        value={animal}
                        onChange={e => {
                            setAnimal(e.target.value)
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value);
                          }}
                        >
                        {/* <option /> adds an empty option at the top */}
                        <option />
                        {ANIMALS.map(animal => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                {/* BREEDS */}
                <label htmlFor="">
                    Breed
                    <select 
                        id="breed"
                        disabled={breeds.length === 0}
                        name="breed"
                        // value={breed}
                        // onChange={e => {
                        //     setBreed(e.target.value)
                        // }} UseEffect
                        >
                        <option />
                        {breeds.map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
                <Results pets={pets} />
        </div>
    )
}

export default SearchParams;