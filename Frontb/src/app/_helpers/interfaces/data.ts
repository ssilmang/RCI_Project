export interface Data {
  id: number | null,
  user_id: Utilisateur,
  activite_id: Activite,
  service_id: Service,
  departement_id: Departement,
  direction_id: Direction,
  periodicite: string | null,
  exhaustivite: string | null,
  preuve: string | null,
  controle : string | null,
  code : string | null,
  descriptif : string | null,
  objectif : string | null,
  type_controle_id : number | null,
  commentaire: string | null,
  date_ajout: Date | null,
  archived_at: Date | null,
  fichier: string | null
  risque_id: string | null,
  validate: string | null,
  etat: boolean | null
  pole_id: Pole,
}

export interface Utilisateur {
  id: number | null,
  nom_complet: string,
  telephone: string | null,
  adresse: string | null,
  matricule: string | null,
  email: string,
  password: string,
  direction_id: number,
  service_id: number
}


export interface Direction {
  id: number | null,
  libelle: string,
}

export interface Controle {
  id: number | null,
  nom_controle: string,
  code: string,
  objectif: string,
  descriptif: string,
  type: string,
}

export interface Risque {
  id: number | null,
  libelle: string,
}

export interface Departement {
  id: number | null,
  libelle: string,
  direction_id: number,
  pole_id: number,
}

export interface Pole {
  id: number | null,
  libelle: string,
  direction_id: number,
}

export interface Service {
  id: number | null,
  libelle: string,
  departement_id: number,
}

export interface Activite {
  id: number | null,
  libelle: string,
  service_id: number,
}

export interface Contry {
  id: number | null,
  libelle: string,
  image: string | null,
}

export interface TypeControle {
  id: number | null,
  libelle: string,
}



export interface Type {
  id: number | null,
  libelle: string
}

export interface Pays {
  id: number | null,
  libelle: string
}

