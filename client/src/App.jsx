import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/matches')
      .then(res => {
        console.log(res.data); 
        setMatches(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-8">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl mb-2 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Todays Football Matches
        </h1>
        <p className="text-center text-gray-300 mt-2">Stay updated with the latest fixtures</p>
      </header>
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {match.homeTeam} <span className="text-blue-400">vs</span> {match.awayTeam}
            </h2>
            <p className="text-gray-300">
              <span className="font-medium">Date:</span> {new Date(match.utcDate).toLocaleString()}
            </p>
            <div className="mt-4 pt-3 border-t border-gray-700">
              <span className="inline-block bg-blue-600 text-xs font-semibold px-3 py-1 rounded-full text-white">
                Live
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;