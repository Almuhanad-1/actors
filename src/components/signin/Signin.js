import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SignIn = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const signin = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        fetch('http://localhost:3000/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(data => {
                if (data.success) {
                    window.localStorage.setItem('token', data.token)
                    console.log(data.token)
                    props.updateToken(data.token)
                    navigate('/')
                } else {
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        title: `<strong>${data.message}</strong>`,
                        icon: 'error',
                    })
                }
            })
        }).catch(e => console.log(e))

    }
    return (
        <>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={signin} className="btn btn-primary">Submit</button>
        </>
    )
}
export default SignIn