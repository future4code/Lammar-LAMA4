import { CustomError } from "./CustomError"


export class InvalidName extends CustomError{ 
  constructor(){
      super(400, "Nome de banda deve possuir, no mínimo, 3 caracteres.")
  }
}

export class BandNameAlreadyExists extends CustomError{ 
  constructor(){
      super(400, "Nome de banda já existente.")
  }
}

export class NotNullName extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um nome.")
  }
}

export class NotNullMusicGenre extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um gênero de música.")
  }
}

export class NotNullResponsible extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um responsável.")
  }
}

export class NotNullToken extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um token.")
  }
}

export class Unauthorized extends CustomError{ 
  constructor(){
      super(401, "Usuário não possui autorização para criar bandas.")
  }
}


