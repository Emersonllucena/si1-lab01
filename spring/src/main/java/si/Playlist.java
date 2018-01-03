package si;

import javax.persistence.*;

@Entity
@Table(name = "TB_PLAYLISTS")
public class Playlist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "ID_USER")
	private long id_user;
	
	@Column(name = "NAME_PLAYLIST")
	private String name;
		
	@Column(name = "SONG_PLAYLIST")
	private String song;
	
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

	public String getSong() {
		return song;
	}

	public void setSong(String song) {
		this.song = song;
	}

}
