
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
  'risque',
  'contry',
  'typeControle',
  'profil'
]

export const uri = {

  utilisateur : {
    list : `${verbs[0]}/all`,
    add : `${verbs[0]}/add`,
    update :`${verbs[0]}/update/`,
    delete : `${verbs[0]}/delete/`,
    restaurer : `${verbs[0]}/restaurer/`,
  },

  controle : {
    list : `${verbs[1]}/all`,
    add : `${verbs[1]}/add`,
    update :`${verbs[1]}/update/`,
    delete : `${verbs[1]}/delete/`,
    restaurer : `${verbs[1]}/restaurer/`,
    validated : `${verbs[1]}/validated/`,
    invalidated : `${verbs[1]}/invalidated/`,
  },

  risque : {
    list : `${verbs[8]}/all`,
    add : `${verbs[8]}/add`,
    update :`${verbs[8]}/update/`,
    delete : `${verbs[8]}/delete/`,
    restaurer : `${verbs[8]}/restaurer/`,
  },

  direction : {
    list : `${verbs[2]}/all`,
    add : `${verbs[2]}/add`,
    update :`${verbs[2]}/update/`,
    delete : `${verbs[2]}/delete/`,
    restaurer : `${verbs[2]}/restaurer/`,
  },

  departement : {
    list : `${verbs[3]}/all`,
    add : `${verbs[3]}/add`,
    update :`${verbs[3]}/update/`,
    delete : `${verbs[3]}/delete/`,
    restaurer : `${verbs[3]}/restaurer/`,
  },

  pole : {
    list : `${verbs[4]}/all`,
    add : `${verbs[4]}/add`,
    update :`${verbs[4]}/update/`,
    delete : `${verbs[4]}/delete/`,
    restaurer : `${verbs[4]}/restaurer/`,
  },

  activite : {
    list : `${verbs[5]}/all`,
    add : `${verbs[5]}/add`,
    update :`${verbs[5]}/update/`,
    delete : `${verbs[5]}/delete/`,
    restaurer : `${verbs[5]}/restaurer/`,
  },

  service : {
    list : `${verbs[6]}/all`,
    add : `${verbs[6]}/add`,
    update :`${verbs[6]}/update/`,
    delete : `${verbs[6]}/delete/`,
    restaurer : `${verbs[6]}/restaurer/`,
  },

  data : {
    list : `${verbs[7]}/all`,
    add : `${verbs[7]}/add`,
    update :`${verbs[7]}/update/`,
    delete : `${verbs[7]}/delete/`,
    restaurer : `${verbs[7]}/restaurer/`,
  },

  contry : {
    list : `${verbs[9]}/all`,
    add : `${verbs[9]}/add`,
    update :`${verbs[9]}/update/`,
    delete : `${verbs[9]}/delete/`,
    restaurer : `${verbs[9]}/restaurer/`,
  },

  typecontrole: {
    list : `${verbs[10]}/all`,
    add : `${verbs[10]}/add`,
    update :`${verbs[10]}/update/`,
    delete : `${verbs[10]}/delete/`,
    restaurer : `${verbs[10]}/restaurer/`,
  },
  profil: {
    list : `${verbs[11]}/all`,
    add : `${verbs[11]}/add`,
    update :`${verbs[11]}/update/`,
    delete : `${verbs[11]}/delete/`,
    restaurer : `${verbs[11]}/restaurer/`,
  },

}
