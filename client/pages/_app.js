import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Headers from '../components/header';

const MyApp = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Headers currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
    );
};

MyApp.getInitialProps = async (context) => {
    const client = buildClient(context.ctx);
    const { data } = await client.get('/api/users/currentuser');
    
    return data;
};

export default MyApp;