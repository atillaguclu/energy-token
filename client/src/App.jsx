import { Navbar, Welcome, Footer, Services, Productions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
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
