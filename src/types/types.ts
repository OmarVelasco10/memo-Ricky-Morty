export type Character = {
    id: number;
    img: string
}

export type MemoBlockType = {
    index: number;
    character: Character;
    flipped: boolean
}