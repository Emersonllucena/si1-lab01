package si;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class UserData {
	
	@PersistenceContext
	private EntityManager em;
	
	public UserData() {
	}
	
	@Transactional
	public User persisteUsuario(User usuario) {
		em.persist(usuario);
		return usuario;
	}
	
	public User consultaObjeto(Long id) {
	    TypedQuery<User> query = em.createQuery("select obj from User obj where obj.id = :id", User.class);
	    query.setParameter("id", id);
	    return query.getSingleResult();
	}
	
	public User consultaEmail(String email) {
	    TypedQuery<User> query = em.createQuery("select obj from User obj where obj.email = :email", User.class);
	    query.setParameter("email", email);
	    return query.getSingleResult();
	}
	
	public boolean usuarioExiste(String email) {
		TypedQuery<Long> query =  em.createQuery("select count(1) from User obj where obj.email = :email", Long.class);
	    query.setParameter("email", email);
	    return query.getSingleResult() == 1L ? true:false;
	}
}