import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const OnePet = (props) => {
  const { id } = useParams();
  const nav = useNavigate();
  const [onePet, setOnePet] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(res.data);
        setOnePet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (petsID) => {
    axios
      .delete(`http://localhost:8000/api/pets/${petsID}`)
      .then((response) => {
        console.log(response);
        nav("/home");
        const filteredPets = setOnePet.filter((pet) => {
          return pet._id !== petsID;
        });
        setOnePet(filteredPets);
      })
      .catch((err) => {
        console.log("error deleting pet", err.response);
      });
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-end me-2 mt-2">
          <div className="link-top">
            <Link to="/home">back to home</Link>
          </div>
        </div>
        <div className="ms-1 pb-3 row">
          <h1 className="col">Details about: {onePet.name}</h1>
          <button
            onClick={() => handleDelete(onePet._id)}
            type="button"
            className="btn btn-outline-danger button-left col w-25"
          >
            <h2>Adopt {onePet.name}</h2>
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card w-75 mt-3">
            <h2 className="pb-3">Name: {onePet.name}</h2>
            <h2 className="pb-3">Type: {onePet.type}</h2>
            <h2 className="pb-3">Description: {onePet.description}</h2>
            {onePet.skills1 || onePet.skills2 || onePet.skills3 ? (
              <h2 className="pb-3">
                Skills:{" "}
                <ul className="list-s ms-5">
                  <li>{onePet.skills1}</li>
                  <li>{onePet.skills2}</li>
                  <li>{onePet.skills3}</li>
                </ul>
              </h2>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnePet;
