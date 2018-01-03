package si;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "TB_USERS")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "EMAIL_USER")
	private String email;
		
	@Column(name = "NOME_USER")
	private String nome;
	
	@Column(name = "SENHA_USER")
	private String senha;
	
	public User() {}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
}
