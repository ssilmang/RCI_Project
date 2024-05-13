export interface Data {
}

export interface Utilisateur {
  id: number | null,
  nom_complet: string,
  telephone: string,
  adresse: string,
  matricule: string,
  email: string,
  password: string,
  direction_id: number,
  service_id: number
}


export interface Direction {
  id: number | null,
  libelle: string,
}

export interface Service {
  id: number | null,
  libelle: string,
  departement_id: number,
}

export interface Controle {
}

export interface Departement {
}

export interface Pole {
  id: number | null,
  libelle: string,
  direction_id: number,
}


export interface Activite {
}

