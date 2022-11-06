import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditActor = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const navigate = useNavigate();
    const { id } = useParams()
    const [actor, setActor] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/actors/' + id)
            .then(res => res.json())
            .then(res => {
                setActor(res)
            })

    }, [])

    const editActor = () => {
        fetch('http://localhost:3000/actors/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            const alertType = res.success ? 'success' : 'warning'
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: `<strong>${res.message}</strong>`,
                icon: alertType,
            }).then(action => {
                navigate('/');
            })
        })
    }
    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1>Edit actor</h1>
                <Link to='/' className="btn btn-success">Go Back</Link>
            </div>
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input value={actor.first_name} onChange={(e) => setActor({...actor, first_name: e.target.value})} ref={firstNameRef} type="text" className="form-control" id="first_name" />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input value={actor.last_name} onChange={(e) => setActor({...actor, last_name: e.target.value})} ref={lastNameRef} type="text" className="form-control" id="last_name" />
            </div>
            <button onClick={editActor} type="submit" className="btn btn-primary">Save</button>
        </>
    )
}

export default EditActor