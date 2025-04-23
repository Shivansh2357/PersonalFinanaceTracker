const Home = () => {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Financial Tracker</h1>
        <p className="text-lg mb-6">
          Take control of your finances with our all-in-one platform for tracking
          transactions, investments, and more.
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-primary text-white p-3 rounded-lg hover:bg-secondary"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-secondary text-white p-3 rounded-lg hover:bg-primary"
          >
            Signup
          </a>
        </div>
      </div>
    );
  };
  
  export default Home;