import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
      nome: nome,
      autor: autor,
      paginas: paginas
    };
    this.htpClient.post<{mensagem: string}>('http://localhost:3000/api/livros',
    livro).subscribe(
      (dados) => {
        console.log(dados.mensagem);
        this.livros.push(livro);
        this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

  getLivros(): void {
    this.htpClient.get<{mensagem: string, livros: Livro[]}>
    ('http://localhost:3000/api/livros').subscribe(
      (dados) => {
        this.livros = dados.livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

  getListaLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }
}
