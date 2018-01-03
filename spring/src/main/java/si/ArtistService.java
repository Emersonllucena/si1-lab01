package si;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArtistService {
	
	@Autowired
	private ArtistData dao;
	
	public ArtistService() {
		dao = new ArtistData();
	}
	
	@RequestMapping(value="/artista", method=RequestMethod.POST)
	public Artist postUsuario(@RequestBody Artist artist, HttpServletResponse response){
		try {
			dao.persisteArtista(artist);
			return artist;
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
	
	@RequestMapping(value="/artistaList/{id}", method=RequestMethod.GET)
	public List<Artist> artistList(@PathVariable Long id, HttpServletResponse response){
		try {
			return dao.getEveryArtist(id); 
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
}