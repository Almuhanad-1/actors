import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from "react-router-dom"


const Actors = () => {
    const [actors, setActors] = useState([])
    const [order, setOrder] = useState('ASC')
    useEffect(() => {
        fetchActors()
    }, [order])

    const fetchActors = () => {
        fetch('http://localhost:3000/actors?order=' + order)
            .then(response => response.json())
            .then(data => {
                setActors(data)
            })
            .catch(error => console.log(error))
    }

    const deleteActor = (actor_id) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Delete Confirmation</strong>,
            icon: "warning",
            dangerMode: true,
        }).then(userAction => {
            console.log(userAction)
            if (userAction) {
                if (userAction.isConfirmed) {
                    fetch('http://localhost:3000/actors/' + actor_id, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(res => {
                            const alertType = res.success ? 'success' : 'warning'
                            const MySwal = withReactContent(Swal)
                            MySwal.fire({
                                title: `<strong>${res.message}</strong>`,
                                icon: alertType,
                            })
                        })
                }
            }
        })
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1>Actors List</h1>
                <div className="d-flex">
                    <select className="form-select me-1" onChange={(e) => { setOrder(e.target.value) }}>
                        <option value="ASC" defaultValue>ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                    <Link to='/add' className="btn btn-success me-1">Add</Link>
                    <Link to='/signin' className="btn btn-primary">SignIn</Link>
                </div>

            </div>
            <ul className="list-group">
                {
                    actors.map((actor, i) => {
                        return <li key={i} className="list-group-item d-flex align-items-center justify-content-between">
                            <span>{`${actor.first_name} ${actor.last_name}`}</span>
                            <span>
                                <button className="btn btn-danger btn-sm mx-2" onClick={() => {
                                    deleteActor(actor.actor_id)
                                }}>Delete</button>
                                <Link to={`edit/${actor.actor_id}`} className="btn btn-info btn-sm">Edit</Link>
                            </span>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default Actors