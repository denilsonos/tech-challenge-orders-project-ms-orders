# tech-challenge-orders-project

Project Tech Challenge Group 62

## Descrição

Este projeto contempla um sistema para gerenciamento de pedidos e estoque.
## Tecnologia

TypeScript: 5.2.2
![Linkedin: HelioSoares](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

Node: 20.2.1
![Linkedin: HelioSoares](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)




## Desenvolvimento

O desenvolvimento se deu por meio de Pair programming, onde os atores e ouvintes definidos([documentação de base](https://docs.google.com/document/d/1T5h---6pFPUxed4JcuHohJVm-L-NUCaBk-LMAonPDmI/edit?usp=sharing)), implementaram e testaram os cenários encontrados no Tech challenge.
## Arquitetura

### Video explicativo
[Video explicativo - pendente]()

### Desenho de Arquitetura

![Arquitetura-ms](https://github.com/denilsonos/tech-challenge-orders-project-ms-orders/assets/23120172/03605444-399c-4d8c-b4a4-af06b4d719ad)

## Deploy

Para rodar o projeto você precisa configurar o arquivo .env, utilizando como base o .env.example.

Exemplo:
```env
    DB_HOST=db
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=mydb
    DB_PORT=3306
    APP_PORT=3000
    APP_HOST=0.0.0.0
    NODE_ENV=dev
```


### Docker

Para execução via docker

```bash
  docker-compose up
```

## Ordem de execução

Para a execução indicamos criar um item e um pedido afim de ter massas de teste. Estes endpoints estão descritos dentro do arquivo Postman:

1 - Criar item:
```
    Postman -> Order -> Create
```

2 - Criar Pedido:
```
    Postman -> Items -> Create
```

## Swagger

http://localhost:3000/docs
## Postman

[Collection para teste](https://github.com/denilsonos/tech-challenge-orders-project/blob/main/Tech%20Challenge%20Collection.postman_collection.json)

## Evidencia de cobertura de testes

![ms-orders](https://github.com/denilsonos/tech-challenge-orders-project-ms-orders/assets/143292502/d62b0977-aeea-48ba-8619-01896e38acc9)

