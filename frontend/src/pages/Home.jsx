import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="home">

      <h1>
        ✈ AI Travel Planner
      </h1>

      <p>
        Create personalized trips with AI.
      </p>

      <div className="home-buttons">

        <Link to="/login">
          <button>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button>
            Register
          </button>
        </Link>

      </div>

    </div>

  );
}

export default Home;