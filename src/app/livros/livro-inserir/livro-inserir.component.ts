import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector:'app-livro-inserir',
  templateUrl:'./livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{

  constructor(public livroService: LivroService){}

  //@Output() livroAdicionado = new EventEmitter()

  //nome: string;
  //autor: string;
  //paginas: number;

  onAdicionarLivro(form: NgForm) {
    if (form.invalid) {
      return;
    }/*
    const livro: Livro = {
      nome: form.value.nome,
      autor: form.value.autor,
      paginas: form.value.paginas
    };*/

    this.livroService.adicionarLivro(
      form.value.nome,
      form.value.autor,
      form.value.paginas
    );
    form.resetForm();

    //this.livroAdicionado.emit(livro);
  }
}
