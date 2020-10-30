import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private livros: Livro[]=[];
  private listaLivrosAtualizada =  new Subject<Livro[]>();

  getLivros(): Livro[] {
    return[...this.livros];
  }

  adicionarLivro(nome: string, autor: string, paginas: number){
    const livro: Livro = {
      nome: nome,
      autor: autor,
      paginas: paginas
    };
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros]);
  }

  getListaLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }
}
