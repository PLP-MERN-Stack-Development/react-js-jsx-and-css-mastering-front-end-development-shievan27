const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">About This App</h1>
      <p className="text-lg text-gray-700">
        This is a simple task management application built with React.</p>
      <p className="text-lg text-gray-700">You can add, delete, and mark tasks as complete.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        it has also a product listing page that fetches products from a public API and displays them with pagination and category filtering.
      </p>
    </div>
  );
};

export default About;
