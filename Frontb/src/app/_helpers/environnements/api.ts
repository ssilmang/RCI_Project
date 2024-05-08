
export const apiUrlEnv = {
  apiUrl : 'http://127.0.0.1:8000/api/'
}


const verbs = [
  'utilisateur',
  'controle',
  'direction',
  'departement',
  'pole',
  'activite',
  'service',
  'data',
]

export const uri = {

  utilisateur : {
    list : `${verbs[0]}/all`,
    add : `${verbs[0]}/add`,
    update :`${verbs[0]}/update/`,
    delete : `${verbs[0]}/delete/`,
  },

  controle : {
    list : `${verbs[1]}/all`,
    add : `${verbs[1]}/add`,
    update :`${verbs[1]}/update/`,
    delete : `${verbs[1]}/delete/`,
  },

  direction : {
    list : `${verbs[2]}/all`,
    add : `${verbs[2]}/add`,
    update :`${verbs[2]}/update/`,
    delete : `${verbs[2]}/delete/`,
  },

  departement : {
    list : `${verbs[3]}/all`,
    add : `${verbs[3]}/add`,
    update :`${verbs[3]}/update/`,
    delete : `${verbs[3]}/delete/`,
  },

  pole : {
    list : `${verbs[4]}/all`,
    add : `${verbs[4]}/add`,
    update :`${verbs[4]}/update/`,
    delete : `${verbs[4]}/delete/`,
  },

  activite : {
    list : `${verbs[5]}/all`,
    add : `${verbs[5]}/add`,
    update :`${verbs[5]}/update/`,
    delete : `${verbs[5]}/delete/`,
  },

  service : {
    list : `${verbs[6]}/all`,
    add : `${verbs[6]}/add`,
    update :`${verbs[6]}/update/`,
    delete : `${verbs[6]}/delete/`,
  },

  data : {
    list : `${verbs[7]}/all`,
    add : `${verbs[7]}/add`,
    update :`${verbs[7]}/update/`,
    delete : `${verbs[7]}/delete/`,
  }


}
