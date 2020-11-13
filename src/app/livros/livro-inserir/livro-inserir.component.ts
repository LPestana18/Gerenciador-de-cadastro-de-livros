import { Component, OnInit} from "@angular/core";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector:'app-livro-inserir',
  templateUrl:'./livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("idLivro")) {
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv => {
          this.livro = {
            id: dadosLiv._id,
            nome: dadosLiv.nome,
            autor: dadosLiv.autor,
            paginas: dadosLiv.paginas
          };
        });
      }
      else {
        this.modo = "criar";
        this.idLivro = null;
      }
    });
  }

  constructor(public livroService: LivroService, public route: ActivatedRoute){}

  //@Output() livroAdicionado = new EventEmitter()

  //nome: string;
  //autor: string;
  //paginas: number;

  onSalvarLivro(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.modo === "criar") {
      this.livroService.adicionarLivro(
        form.value.nome,
        form.value.autor,
        form.value.paginas
      );
    }
    else {
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.nome,
        form.value.autor,
        form.value.paginas
      );
    }
    form.resetForm();

    //this.livroAdicionado.emit(livro);
  }
}
