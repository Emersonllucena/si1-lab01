package si;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class ArtistData {
	
	@PersistenceContext
	private EntityManager em;
	
	public ArtistData() {
	}
	
	@Transactional
	public Artist persisteArtista(Artist artista) {
		em.persist(artista);
		return artista;
	}
	
	public List<Artist> getEveryArtist(Long id) {
		System.out.println(id);
	    TypedQuery<Artist> query = em.createQuery("select obj from Artist obj where obj.id_user = :id", Artist.class);
	    query.setParameter("id", id);
	    return query.getResultList();
	}
}