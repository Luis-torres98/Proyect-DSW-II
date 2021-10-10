export interface User {
	id_usuario?:            number;
	nombre?:                string;
	apellidos?:             string;
	fechanacimiento?:       string;
	celular?:               string;
	dni?:                   string;
	contraseña?:            string;
	rol?:                   Rol;
	distrito?:              Distrito;
	enabled?:               boolean;
	username?:              string;
	password?:              string;
	authorities?:           Authority[];
	accountNonExpired?:     boolean;
	accountNonLocked?:      boolean;
	credentialsNonExpired?: boolean;
}

export interface Authority {
	authority?: string;
}

export interface Distrito {
	id_distrito?:      number;
	nombre_distrito?:  string;
	provincia?:        Provincia;
	cod_departamento?: string;
}

export interface Provincia {
	id_provincia?:     number;
	nombre_provincia?: string;
	departamento?:     Departamento;
}

export interface Departamento {
	id_departamento?:     string;
	nombre_departamento?: string;
}

export interface Rol {
	id_rol?:     number;
	nombre_rol?: string;
}