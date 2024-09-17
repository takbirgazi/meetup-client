import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home - Tech Thunders</title>
            </Helmet>
            <div>
                <h2>This is Home Page</h2>
            </div>
        </div>
    );
};

export default Home;