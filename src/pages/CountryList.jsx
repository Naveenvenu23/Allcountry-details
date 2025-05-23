import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


const CountryList = () => {
  const [countryDatas, setCountryDatas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        setCountryDatas(data);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-5xl font-semibold mt-10 text-center mb-6">
        Countries
      </h1>

      <div className="flex flex-wrap gap-10 justify-center px-4">
        {countryDatas.map((country) => (
          <Link to={`/country/${country.cca2}`}
            key={country.cca3}
            className="h-[280px] w-[300px] border rounded-lg overflow-hidden shadow"
          >
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-[200px] object-cover"
            />
            <h2 className="text-center py-2 font-medium mt-2">
              {country.cca2} – {country.name.common}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
