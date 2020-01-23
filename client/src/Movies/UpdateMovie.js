import React, { useEffect, useState } from "react";
import axios from "axios";

const initialMovie = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: []
}

function UpdateMovie(props) {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(response => {
                console.log(response);
                setMovie(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    

    const onChange = event => {
        setMovie({...movie, [event.target.name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(response => {
                console.log(response);
                setMovie(response.data)
            })
            .catch(error => console.log(error))
            setTimeout(function() {
                props.history.push("/")
            }, 500)
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" name="title" value={movie.title} placeholder="Title" />
                <input onChange={onChange} type="text" name="director" value={movie.director} placeholder="Director" />
                <input onChange={onChange} type="text" name="metascore" value={movie.metascore} placeholder="Metascore" />
                <button type="submit">Update Item</button>
            </form>
        </div>
    )
}

export default UpdateMovie;