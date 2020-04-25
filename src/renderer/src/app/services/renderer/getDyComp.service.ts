import { Injectable } from '@angular/core';
import { componentWithClass } from 'src/app/dataPattern/componentWithClass';
import { LinkComponent } from 'src/app/components/Yen/link/link.component';
import { ParaComponent } from 'src/app/components/Yen/para/para.component';
import { linkData } from 'src/app/dataPattern/componentData/link';
import { paraData } from 'src/app/dataPattern/componentData/para';
import { ideaData } from 'src/app/dataPattern/componentData/idea';
import { IdeaComponent } from 'src/app/components/Yen/idea/idea.component';
import { WordComponent } from 'src/app/components/Yen/word/word.component';
import { wordData } from 'src/app/dataPattern/componentData/word';

@Injectable({
  providedIn: 'root'
})
export class GetDyCompService {
  linkdata: linkData = {
    external: true,
    title: "title",
    url: "url"
  };
  paraData: paraData = {
    para: `  data
    
    from 
    
        para.
    enjoy :smile.`
  };

  word: wordData ={
    language : null,
    type : 'Important',
    words : ['security']
  };
  idea: ideaData = {
    idea: 'this is best way!this is best way!this is best way!this is best way!this is best way!this is best way!this is best way!',
    title: 'First Time',
    type: 'idea'
  };
  constructor() { }
  getDyCompForThisPage(): Promise<componentWithClass[]> {

    return new Promise((resolve) => {
      resolve(
        [new componentWithClass(LinkComponent, this.linkdata),
        new componentWithClass(ParaComponent, this.paraData),
        new componentWithClass(IdeaComponent, this.idea),
        new componentWithClass(WordComponent, this.word )
        ]);
    })
  }
}
