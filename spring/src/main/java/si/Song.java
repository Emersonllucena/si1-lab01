package si;

import javax.persistence.*;

@Entity
@Table(name = "TB_SONGS")
public class Song {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "ID_USER")
	private long id_user;
	
	@Column(name = "NAME_SONG")
	private String name;
		
	@Column(name = "ARTIST_SONG")
	private String artist;
	
	@Column(name = "ALBUM_SONG")
	private String album;
	
	@Column(name = "YEAR_SONG")
	private String year;
	
	@Column(name = "DURATION_SONG")
	private String duration;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getId_user() {
		return id_user;
	}

	public void setId_user(long id_user) {
		this.id_user = id_user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}
}
