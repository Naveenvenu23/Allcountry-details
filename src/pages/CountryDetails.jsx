import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const CountryDetails = () => {
  const { code } = useParams(); // country code from URL
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Link to="/" className="text-blue-600 underline mb-4 block">
        ← Back to Countries
      </Link>

      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-64 object-cover rounded shadow"
      />
      <h1 className="text-4xl font-bold mt-4">{country.name.common}</h1>
      <p className="mt-2 text-lg text-gray-700">
        Official Name: {country.name.official}
      </p>
      <p className="text-gray-700">Capital: {country.capital?.[0] || 'N/A'}</p>
      <p className="text-gray-700">Region: {country.region}</p>
      <p className="text-gray-700">Subregion: {country.subregion}</p>
      <p className="text-gray-700">
        Population: {country.population.toLocaleString()}
      </p>
      <p className="text-gray-700">
        Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
      </p>
      <p className="text-gray-700">
        Currencies: {country.currencies
          ? Object.values(country.currencies)
              .map((c) => `${c.name} (${c.symbol})`)
              .join(', ')
          : 'N/A'}
      </p>
    </div>
  );
};

export default CountryDetails;
