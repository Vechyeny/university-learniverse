// AuthorInfo.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Intershipinfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBook } = location.state || {};
  const [showFullDecs, setShowFullDecs] = useState(false);
  const [showPersonality, setShowPersonality] = useState(false);

  if (!selectedBook) {
    return <div>No author information available.</div>;
  }

  const { Dateline, Duration, description, image,} = selectedBook;

  const togglePersonalityVisibility = () => {
    setShowPersonality(!showPersonality);
    setShowFullDecs(false); // Close Decs section when toggling Personality
  };

  const handleBackClick = () => {
    navigate("/internship");
  };

  return (
    <div className="w-full h-[970px] overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4 mt-8 mb-8 ">
      <button
        onClick={handleBackClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded 
        transition duration-300 ease-in-out focus:outline-none"
      >
        Back
      </button>
        <div className="flex items-center justify-center h-full mb-6 ">
          <p className="text-center text-5xl py-16 font-bold text-green-800 book-title">Information</p>
        </div>

        <img src={image} alt="" className="w-[500px] h-[500px] mx-auto mb-4 rounded-lg shadow-lg" />
        <div className="flex justify-center space-x-20">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none mb-2 
          transition-all duration-300 ease-in-out transform hover:scale-105 active:bg-blue-600"
            onClick={togglePersonalityVisibility}
          >
            Read More
          </button>
        </div>

        {showPersonality && (
          <div className="p-4 rounded-md bg-gray-100">
            <h2 className=" mb-2 book-title">Description : Trinity offers a number of undergraduate scholarships for 
            international students. These scholarships are awarded to acknowledge the highest achieving students and to assist international students of limited means. Many scholarships are made 
            possible by bequests and gifts that have been generously donated to Trinity over the years. </h2>
            <p className="mb-2 book-title ">Benefits : The Japanese Students Service Association – JASSO (日本学生支援機構) offers a number of scholarships for Japanese students to study abroad (海外留学の奨学金).</p>
            <p className="mb-2 book-title ">Eligibility : Applicants must be Japanese students.</p>
            


            {showFullDecs ? <p>{description}</p> : <p className="mb-2 book-decs">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Intershipinfo;