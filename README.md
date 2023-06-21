# CHILD REWARDS
Projeto para gestão de recompensas para tarefas de casa de crianças

# Instalação
## Docker
Primeiro crie uma imagem a partir do arquivo dockerfile que está na raiz do projeto (você deve incluir o '.' ponto final no comando abaixo)  
`docker build -t api-child-rewards .`  

Após o criar a imagem crie um container a partir desta imagem criada 'api-child-rewards'  
`docker run -d -p 8000:8000 api-child-rewards`

então acesse: http://localhost:8000/ no navegador ou via aplicativo como 'postman' ou 'insomnia'

# Como usar
## API
### Users - Classe responsável em gerenciar o usuário da aplicação (responsável da criança)

```http
  GET /users/
```

| Parametros | Tipo     | Descrição                             |
| :--------- | :------- | :------------------------------------ |

| Return |
| :----- |
| Users[]|

# Tecnologias usadas
- Docker
- Node.js
- Express

# Licença

# Documentação

# Contribuições
Não estamos aceitando contribuições no momento.

# Equipe
<table>
  <tr>
    <td align="center"><a href="https://github.com/levymeireles"><img src="https://avatars.githubusercontent.com/u/27810000?v=4" width="100px;" alt=""/><br /><sub><b>Levy Meireles</b></sub></a><br /><p>💻</p></td>
    <td align="center"><a href="https://github.com/Gabryel-Santos"><img src="https://avatars.githubusercontent.com/u/79161766?v=4" width="100px;" alt=""/><br /><sub><b>Gabryel Meireles</b></sub></a><br /><p>💻📖</p></td>
    <td align="center"><a href="https://github.com/LeonardoSosa"><img src="https://avatars.githubusercontent.com/u/88515510?v=4" width="100px;" alt=""/><br /><sub><b>Leonardo Sosa</b></sub></a><br /><p>💻📖</p></td>
    <td align="center"><a href="https://github.com/HugoJSG"><img src="https://avatars.githubusercontent.com/u/88464170?v=4" width="100px;" alt=""/><br /><sub><b>Hugo Sosa</b></sub></a><br /><p>📖</p></td>
  </tr>
</table>
