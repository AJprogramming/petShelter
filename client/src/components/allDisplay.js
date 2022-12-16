import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import { Link } from "react-router-dom";

const All = () => {
  const [allPets, setAllPets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        console.log(res.data);
        setAllPets(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handleDelete = (petsID) => {
    axios
      .delete(`http://localhost:8000/api/pets/${petsID}`)
      .then((response) => {
        console.log(response);
        const filteredPets = allPets.filter((pet) => {
          return pet._id !== petsID;
        });
        setAllPets(filteredPets);
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
            <Link to="/new">Add a pet to the shelter</Link>
          </div>
        </div>
        <div className="ms-3 pb-3">
          <h1>These pets are looking for a good home</h1>
        </div>
        <div className="row">
          <table className="table table-striped text-center border w-75 ms-4">
            <thead>
              <tr>
                <th scope="col">Names:</th>
                <th scope="col">Types:</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPets.map((pet, i) => {
                return (
                  <tr key={i} className="align-middle">
                    <td scope="row">{pet.name}</td>
                    <td scope="row">{pet.type}</td>
                    <td>
                      <Link to={`/pets/${pet._id}`}>
                        <button type="button" className="btn btn-outline-info">
                          Details
                        </button>
                      </Link>{" "}
                      <Link to={`/pets/${pet._id}/edit`}>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          {" "}
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default All;
