// "https://rickandmortyapi.com/api/character"

import { Character } from "../types/types";

export async function fetchCharacters(): Promise<Character[]> {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if(!response.ok) {
        throw new Error("Filed to fetch characters");
    }

    const result = await response.json();

    const characters = result.results.map((character: any) => ({
        id: character.id,
        img: character.image
    }));

    return characters
}