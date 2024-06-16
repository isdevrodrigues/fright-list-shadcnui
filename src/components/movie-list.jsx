"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Adjust import if necessary

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/movies.json');
                const movies = await response.json();
                setMovies(movies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center p-8">
            <div className="text-sm mb-4">
                <span># of movies: {movies.length}</span>
                <span className="ml-4">Last update: 2024-05-25</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
                {movies.map(movie => (
                    <div key={movie.uuid} className="flex flex-col items-center">
                        <img
                            alt={movie.title}
                            className="w-full h-auto mb-4"
                            height="300"
                            src={movie.posterLink}
                            style={{
                                aspectRatio: "200/300",
                                objectFit: "cover",
                            }}
                            width="200"
                        />
                        <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                        <p className="mb-2">{movie.releaseDate}</p>
                        <Button as="a" href={movie.externalLink} target="_blank" rel="noopener noreferrer">Letterboxd</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
