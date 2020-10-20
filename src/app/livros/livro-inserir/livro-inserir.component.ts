import { Component, EventEmitter, Output } from "@angular/core";
import { Livro } from '../livro.model';

@Component({
  selector:'app-livro-inserir',
  templateUrl:'./livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{

  @Output() livroAdicionado = new EventEmitter()

  nome: string;
  autor: string;
  paginas: number;

  onAdicionarLivro() {
    const livro: Livro = {
      nome: this.nome,
      autor: this.autor,
      paginas: this.paginas
    };
    this.livroAdicionado.emit(livro);
  }

}
