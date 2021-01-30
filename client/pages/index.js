import buildClient from '../api/buildClient';

const index = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>landing page</h1>
};

export async function getServerSideProps(context) {
    const { data } = await buildClient(context).get('/api/users/currentuser');

    return {
        props: data
    }
}

export default index;
