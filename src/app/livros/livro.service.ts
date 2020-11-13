import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private livros: Livro[]=[];
  private listaLivrosAtualizada =  new Subject<Livro[]>();

  constructor(private htpClient: HttpClient) {

  }

  adicionarLivro(nome: string, autor: string, paginas: number){
    const livro: Livro = {
      id: null,
      nome: nome,
      autor: autor,
      paginas: paginas
    };
    this.htpClient.post<{mensagem: string, id: string}>('http://localhost:3001/api/livros',
    livro).subscribe(
      (dados) => {
        livro.id = dados.id;
        this.livros.push(livro);
        this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

  getLivros(): void {
    this.htpClient.get<{mensagem: string, livros: any}>
    ('http://localhost:3001/api/livro')
    .pipe(map((dados) =>{
      return dados.livros.map(livro => {
        return {
          id: livro._id,
          nome: livro.nome,
          autor: livro.autor,
          paginas: livro.paginas
        }
      })
    }))
    .subscribe(
      (livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

removerLivro(id: string) : void {
  this.htpClient.delete(`http://localhost:3001/api/livros/${id}`).subscribe(() =>{
    this.livros = this.livros.filter((liv) => {
      return liv.id !== id
    });
    this.listaLivrosAtualizada.next([...this.livros]);
  });
}

  getListaLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }
}
