import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to={'/register'}>Sign up</Link>
            <Link to={'/login'}>Sign in</Link>
        </div>
    );
}

export default Home;