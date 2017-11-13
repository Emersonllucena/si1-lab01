class Artist {
	constructor(name, info, image) {
		this.name = name;
		this.info = info;
		this.image = image;
		this.fav = false;
		this.lastSong = "";
		this.rating = "";
	}
}

class Album {
	constructor(name, artist) {
		this.name = name;
		this.artist = artist;
		this.songs = [];
	}
}

class Song {
	constructor(name, artist, album, year, duration) {
		this.name = name;
		this.artist = artist;
		this.album = album;
		this.year = year;
		this.duration = duration;
	}
}

class Playlist {
	constructor(name) {
		this.name = name;
		this.songs = [];
	}
}