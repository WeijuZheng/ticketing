import axios from 'axios';

const buildClient = ({ req }) => {
    // from next.js 9.3 on, using getServerSideProps() will only executed on server side
    // do not need the following condition any more
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: 'http://www.ticketing-app-practice.xyz/',
            headers: req.headers
        });
    } else {
        // we are on the browser    
        return axios.create({
            baseURL: '/'
        });
    }

    
};

export default buildClient;