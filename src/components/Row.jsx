import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ title, fetchURL }) => {
  const [movies, setMovie] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovie(response.data.results);
    });
  }, [fetchURL]);

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500; // Adjust the scroll distance as needed
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500; // Adjust the scroll distance as needed
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          size={40}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          onClick={handleScrollLeft}
        />
        <div
          ref={sliderRef}
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          size={40}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          onClick={handleScrollRight}
        />
      </div>
    </>
  );
};

export default Row;
