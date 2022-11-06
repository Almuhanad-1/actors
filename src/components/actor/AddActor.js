import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddActor = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const navigate = useNavigate();

    const addActor = () => {
        fetch('http://localhost:3000/actors/', {
            method: 'post',
            body: JSON.stringify({
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    firstNameRef.current.value = ''
                    lastNameRef.current.value = ''
                }
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
                <h1>Add a new actor</h1>
                <Link to='/' className="btn btn-success">Go Back</Link>
            </div>
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input ref={firstNameRef} type="text" className="form-control" id="first_name" />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input ref={lastNameRef} type="text" className="form-control" id="last_name" />
            </div>
            <button onClick={addActor} type="submit" className="btn btn-primary">Add</button>
        </>
    )
}

export default AddActor