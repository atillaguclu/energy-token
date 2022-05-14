import { Navbar, Welcome, Footer, Services, Productions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div className=''>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Productions />
      <Footer />
    </div>
  );
}

export default App;
