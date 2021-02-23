import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Headers from '../components/header';

const MyApp = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Headers currentUser={currentUser} />
            <div className="container">
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    );
};

MyApp.getInitialProps = async (context) => {
    const client = buildClient(context.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
};

export default MyApp;