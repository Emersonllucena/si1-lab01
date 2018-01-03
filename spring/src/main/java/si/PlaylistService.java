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
public class PlaylistService {
	
	@Autowired
	private PlaylistData dao;
	
	public PlaylistService() {
		dao = new PlaylistData();
	}
	
	@RequestMapping(value="/playlist", method=RequestMethod.POST)
	public Playlist postPlaylist(@RequestBody Playlist playlist, HttpServletResponse response){
		try {
			dao.persistePlaylist(playlist);
			return playlist;
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
	
	@RequestMapping(value="/playlistRemove/{name}", method=RequestMethod.GET)
	public void remPlaylist(@PathVariable String name, HttpServletResponse response){
		try {
			System.out.println("abciuab " + name);
			dao.remPlaylist(name);
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/playlists/{id}", method=RequestMethod.GET)
	public List<Playlist> playlists(@PathVariable Long id, HttpServletResponse response){
		try {
			return dao.getEveryPlaylist(id); 
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
}