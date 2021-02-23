import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const CreateTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: { title, price },
        onSuccess: (ticket) => Router.push('/')
    });

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    }

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    }

    return <div>
        <h1>Create a ticket</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    onBlur={onBlur}
                />
            </div>
            {errors}
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
};

export default CreateTicket;