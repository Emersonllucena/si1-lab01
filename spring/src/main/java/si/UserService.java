package si;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserService {
	
	@Autowired
	private UserData dao;
	
	private User currentUser;
	
	public UserService() {
		dao = new UserData();
	}
	
	@RequestMapping(value="/usuario", method=RequestMethod.POST)
	public User postUsuario(@RequestBody User usuario, HttpServletResponse response){
		try {
			dao.persisteUsuario(usuario);
			currentUser = usuario;
			return usuario;
		} catch(Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return null;
	}
	
	@RequestMapping(value="/usuario/{id}", method=RequestMethod.GET)
	public User getUsuario(@PathVariable Long id){
		return dao.consultaObjeto(id);
	}
	
	@RequestMapping(value="/usuarioAtual", method=RequestMethod.GET)
	public User getUsuario(){
		return currentUser;
	}
	
	@RequestMapping(value="/usuarioLogar", method=RequestMethod.POST)
	public User login(@RequestBody User usuario){
		if (dao.usuarioExiste(usuario.getEmail())) {
			User novo = dao.consultaEmail(usuario.getEmail());
			System.out.println(novo.getSenha() + " " + novo.getEmail() + " " + usuario.getSenha() + " " + usuario.getEmail());
			if(novo.getSenha().equals(usuario.getSenha()) && novo.getEmail().equals(usuario.getEmail())) {
				currentUser = novo;
				return novo;
			}
		}
		throw new RuntimeException("Usuario ou Senha invalidos");
	}
}