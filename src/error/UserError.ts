import { CustomError } from "./CustomError"


export class InvalidName extends CustomError{ 
  constructor(){
      super(400, "O nome deve possuir, no mínimo, 3 caracteres")
  }
}

export class InvalidEmail extends CustomError{ 
  constructor(){
      super(400, "Email inválido.")
  }
}

export class InvalidPassword extends CustomError{ 
  constructor(){
      super(400, "Senha inválida.")
  }
}

export class UserNotFound extends CustomError{ 
  constructor(){
      super(404, "Usuário não encontrado.")
  }
}

export class Unauthorized extends CustomError{ 
  constructor(){
      super(401, "Usuário não autorizado.")
  }
}

export class InvalidUser extends CustomError{ 
  constructor(){
      super(400, "Tipo de user inválido. O user deve ser do tipo 'normal' ou 'admim'.")
  }
}
  
export class NotNullName extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um nome.")
  }
}

export class NotNullEmail extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um e-mail.")
  }
}

export class NotNullPassword extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir uma senha.")
  }
}

export class NotNullRole extends CustomError{ 
  constructor(){
      super(404, "É necessário inserir um role.")
  }
}
