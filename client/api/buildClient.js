import axios from 'axios';

const buildClient = ({ req }) => {
    // from next.js 9.3 on, using getServerSideProps() will only executed on server side
    // do not need the following condition any more
    // if (typeof window === 'undefined') {
    //     // we are on the server
    //     const { data } = await axios.get('http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/currentuser');
    //     return {
    //         props: data
    //     }
    // } else {
    //     // we are on the browser    
    //     const { data } = await axios.get('/api/users/currentuser');
    //     return {
    //         props: data
    //     }
    // }

    return axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: req.headers
    });
};

export default buildClient;