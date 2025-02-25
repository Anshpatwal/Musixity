export interface song {
    _id: string,
    title: string,
    artist: string,
    audioUrl: string,
    albumId: string | null,
    imageUrl: string,
    duration: number,
    createdAt: string,
    updatedAt: string
}

export interface album {
    _id: string,
    title: string,
    artist: string,
    songs: song[],
    imageUrl: string,
    createdAt: string,
    updatedAt: string
}


export interface stats {
    totalSongs: number,
    totalAlbums: number,
    totalUser: number,
    totalArtist: number,
}

export interface Message {
    _id: string,
    senderId: string,
    recieverId: string,
    content: string,
    createdAt: string,
    updatedAt: string
}

export interface User {
    _id: string,
    clerkId: string,
    fullName: string,
    imageUrl: string
}