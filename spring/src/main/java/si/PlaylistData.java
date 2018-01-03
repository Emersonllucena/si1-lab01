package si;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class PlaylistData {
	
	@PersistenceContext
	private EntityManager em;
	
	public PlaylistData() {
	}

	@Transactional
	public Playlist persistePlaylist(Playlist playlist) {
		em.persist(playlist);
		return playlist;
	}

	public List<Playlist> getEveryPlaylist(Long id) {
		System.out.println(id);
	    TypedQuery<Playlist> query = em.createQuery("select obj from Playlist obj where obj.id_user = :id", Playlist.class);
	    query.setParameter("id", id);
	    return query.getResultList();
	}

	@Transactional
	public void remPlaylist(String song) {
		TypedQuery<Playlist> query = em.createQuery("select obj from Playlist obj where obj.song = :song", Playlist.class);
	    query.setParameter("song", song);
	    Playlist play = query.getSingleResult();
	    System.out.println(play.getName());
	    System.out.println(play.getSong());
	    em.remove(play);
	}

}
