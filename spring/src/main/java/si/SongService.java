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
public class SongService {
	
	@Autowired
	private SongData dao;
	
	public SongService() {
		dao = new SongData();
	}
	
	@RequestMapping(value="/song", method=RequestMethod.POST)
	public Song postSong(@RequestBody Song song, HttpServletResponse response){
		try {
			dao.persisteMusica(song);
			return song;
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
	
	@RequestMapping(value="/songList/{id}", method=RequestMethod.GET)
	public List<Song> songList(@PathVariable Long id, HttpServletResponse response){
		try {
			return dao.getEverySong(id); 
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
}