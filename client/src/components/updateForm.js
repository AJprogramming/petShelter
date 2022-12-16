import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
const PetUpdateForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skills1, setSkills1] = useState("");
  const [skills2, setSkills2] = useState("");
  const [skills3, setSkills3] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setSkills1(res.data.skills1);
        setSkills2(res.data.skills2);
        setSkills3(res.data.skills3);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/pets/${id}`, {
        name,
        type,
        description,
        skills1,
        skills2,
        skills3,
      })
      .then((res) => {
        console.log(res);
        nav("/home");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
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
        <div className="ms-3 pb-3">
          <h1>Edit {name}</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card w-75">
            <form onSubmit={handleSubmit}>
              <div className="form-group w-75 card-body">
                <div className="row">
                  <div className="col">
                    <label htmlFor="name">Pet Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    {errors.name ? <p>{errors.name.message}</p> : null}
                    <label htmlFor="name">Pet Type:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    />
                    {errors.type ? <p>{errors.type.message}</p> : null}
                    <label htmlFor="type">Pet Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    {errors.description ? (
                      <p>{errors.description.message}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <h1>Optional:</h1>
                    <label htmlFor="type">Skills 1:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setSkills1(e.target.value)}
                      value={skills1}
                    />
                    <label htmlFor="type">Skills 2:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setSkills2(e.target.value)}
                      value={skills2}
                    />
                    <label htmlFor="type">Skills 3:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setSkills3(e.target.value)}
                      value={skills3}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-start mt-1">
                  <button className="btn btn-primary" type="submit">
                    Edit Pet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PetUpdateForm;
