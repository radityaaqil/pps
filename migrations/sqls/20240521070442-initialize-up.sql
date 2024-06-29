-- MIGRATE UP --

create table position_enum (
	id bigserial not null,
	name varchar(100) not null,
	primary key (id)
);

create table "user" (
	id bigserial not null,
	name VARCHAR(100) not null, 
	email VARCHAR(100) not null,
	password VARCHAR(255) not null,
	nik varchar(100) default '',
	phone_number varchar(100) default '',
    position_id int,
	address varchar(255) default '',
	role varchar(20) default 'USER',
	birth_date timestamptz,
	is_verified bool default false,
	created_at timestamptz default now(),
	created_by varchar(100),
	updated_at timestamptz,
	updated_by varchar(100),
	primary key (id),
	foreign key(position_id) references position_enum(id)
);

create table "program" (
	id bigserial not null,
	name varchar(100) not null,
	start_date timestamptz not null,
	end_date timestamptz not null,
	status varchar(50) default 'CREATED',
	background text default '',
	frequency jsonb,
	monitoring_method jsonb,
	kpi jsonb,
	result jsonb,
	enforcement_method jsonb,
	created_at timestamptz default now(),
	created_by varchar(100),
	updated_at timestamptz,
	updated_by varchar(100),
	primary key (id)
);

create table activity (
	id bigserial not null,
	program_id int not null,
	pic varchar(100) not null,
	remark text,
	status varchar(50) default 'CREATED',
	start_date timestamptz,
	end_date timestamptz,
	created_at timestamptz default now(),
	created_by varchar(100),
	updated_at timestamptz,
	updated_by varchar(100),
	primary key (id),
	foreign key(program_id) references "program"(id)
);

create table report (
	id bigserial not null,
	activity_id int not null,
	attachments text[] default '{}',
	remark text default '',
	primary key (id),
	foreign key(activity_id) references activity(id)
);

create table user_assignation (
	id bigserial not null,
	user_id int not null,
	program_id int not null,
	status varchar(50) not null default 'ASSIGNED',
	primary key (id),
	foreign key(user_id) references "user"(id),
	foreign key(program_id) references "program"(id)
);

create table activity_history (
	id bigserial not null,
	user_id int not null,
	user_name varchar(100) not null,
	user_position varchar(100) not null,
	data jsonb not null,
	created_at timestamptz default now(),
	created_by varchar(100) default 'system@iture.com'
);