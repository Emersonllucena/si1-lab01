package si;

import javax.persistence.*;

@Entity
@Table(name = "TB_ARTISTS")
public class Artist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "ID_USER")
	private long id_user;
	
	@Column(name = "NAME_ARTIST")
	private String name;
		
	@Column(name = "INFO_ARTIST")
	private String info;
	
	@Column(name = "URL_ARTIST")
	private String url;
	
	public Artist() {}
	
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
	
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
