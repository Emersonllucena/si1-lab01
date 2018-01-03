package si;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class SongData {

	@PersistenceContext
	private EntityManager em;
	
	public SongData() {
	}
	
	@Transactional
	public Song persisteMusica(Song song) {
		em.persist(song);
		return song;
	}

	public List<Song> getEverySong(Long id) {
		System.out.println(id);
	    TypedQuery<Song> query = em.createQuery("select obj from Song obj where obj.id_user = :id", Song.class);
	    query.setParameter("id", id);
	    return query.getResultList();
	}

}
