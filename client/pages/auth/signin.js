import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/useRequest";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
    </form>
};

export default Signin;