--
-- PostgreSQL database dump
--

\restrict dMbL0Up00auSsyUwGXnZ0mzHCLYS1C2I06b2WB3kvkf17eaB0ZA3JsPdtWGES7e

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: MediaTipo; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MediaTipo" AS ENUM (
    'imagen',
    'video',
    'pdf'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Columnista; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Columnista" (
    id integer NOT NULL,
    nombre text NOT NULL,
    bio text NOT NULL,
    "fotoUrl" text,
    redes jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Columnista_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Columnista_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Columnista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Columnista_id_seq" OWNED BY public."Columnista".id;


--
-- Name: ContenidoDestacado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ContenidoDestacado" (
    id integer NOT NULL,
    media text NOT NULL,
    url text,
    "fechaInicio" timestamp(3) without time zone,
    "fechaFin" timestamp(3) without time zone,
    titulo text,
    ubicacion text NOT NULL,
    visible boolean DEFAULT true NOT NULL
);


--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ContenidoDestacado_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ContenidoDestacado_id_seq" OWNED BY public."ContenidoDestacado".id;


--
-- Name: Editorial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Editorial" (
    id integer NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    autor text
);


--
-- Name: Editorial_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Editorial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Editorial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Editorial_id_seq" OWNED BY public."Editorial".id;


--
-- Name: Media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Media" (
    id integer NOT NULL,
    url text NOT NULL,
    tipo public."MediaTipo" NOT NULL,
    descripcion text,
    "editorialId" integer,
    "opinionId" integer
);


--
-- Name: Media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Media_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Media_id_seq" OWNED BY public."Media".id;


--
-- Name: Noticia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Noticia" (
    id integer NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    resumen text NOT NULL,
    "autorTexto" text NOT NULL,
    "autorFoto" text NOT NULL,
    destacada boolean DEFAULT false NOT NULL,
    "fechaPublicacion" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "seccionId" integer
);


--
-- Name: NoticiaMedia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."NoticiaMedia" (
    "noticiaId" integer NOT NULL,
    "mediaId" integer NOT NULL
);


--
-- Name: Noticia_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Noticia_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Noticia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Noticia_id_seq" OWNED BY public."Noticia".id;


--
-- Name: Opinion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Opinion" (
    id integer NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "columnistaId" integer NOT NULL,
    destacado boolean DEFAULT false NOT NULL
);


--
-- Name: Opinion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Opinion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Opinion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Opinion_id_seq" OWNED BY public."Opinion".id;


--
-- Name: PDF; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PDF" (
    id integer NOT NULL,
    url text NOT NULL,
    fecha timestamp(3) without time zone NOT NULL,
    descripcion text
);


--
-- Name: PDF_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PDF_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: PDF_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PDF_id_seq" OWNED BY public."PDF".id;


--
-- Name: Rol; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Rol" (
    id integer NOT NULL,
    nombre text NOT NULL
);


--
-- Name: Rol_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Rol_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Rol_id_seq" OWNED BY public."Rol".id;


--
-- Name: Seccion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Seccion" (
    id integer NOT NULL,
    nombre text NOT NULL
);


--
-- Name: Seccion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Seccion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Seccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Seccion_id_seq" OWNED BY public."Seccion".id;


--
-- Name: Usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: UsuarioRol; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsuarioRol" (
    "usuarioId" integer NOT NULL,
    "rolId" integer NOT NULL
);


--
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
-- Name: View; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."View" (
    id integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    tipo text NOT NULL,
    configuracion jsonb NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: View_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."View_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: View_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."View_id_seq" OWNED BY public."View".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Columnista id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Columnista" ALTER COLUMN id SET DEFAULT nextval('public."Columnista_id_seq"'::regclass);


--
-- Name: ContenidoDestacado id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContenidoDestacado" ALTER COLUMN id SET DEFAULT nextval('public."ContenidoDestacado_id_seq"'::regclass);


--
-- Name: Editorial id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Editorial" ALTER COLUMN id SET DEFAULT nextval('public."Editorial_id_seq"'::regclass);


--
-- Name: Media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Media" ALTER COLUMN id SET DEFAULT nextval('public."Media_id_seq"'::regclass);


--
-- Name: Noticia id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Noticia" ALTER COLUMN id SET DEFAULT nextval('public."Noticia_id_seq"'::regclass);


--
-- Name: Opinion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Opinion" ALTER COLUMN id SET DEFAULT nextval('public."Opinion_id_seq"'::regclass);


--
-- Name: PDF id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PDF" ALTER COLUMN id SET DEFAULT nextval('public."PDF_id_seq"'::regclass);


--
-- Name: Rol id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rol" ALTER COLUMN id SET DEFAULT nextval('public."Rol_id_seq"'::regclass);


--
-- Name: Seccion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Seccion" ALTER COLUMN id SET DEFAULT nextval('public."Seccion_id_seq"'::regclass);


--
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- Name: View id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."View" ALTER COLUMN id SET DEFAULT nextval('public."View_id_seq"'::regclass);


--
-- Data for Name: Columnista; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Columnista" (id, nombre, bio, "fotoUrl", redes, "createdAt") FROM stdin;
1	hector	hjhgjhgjhgjhgjhgjhg	/uploads/1757731990034-1754508122611.webp	\N	2025-09-13 02:53:14.987
2	Soraya González 	Cronista e historiadora del municipio San José de Guaribe 	/uploads/1757879920381-Soraya.webp	\N	2025-09-14 19:58:47.109
\.


--
-- Data for Name: ContenidoDestacado; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ContenidoDestacado" (id, media, url, "fechaInicio", "fechaFin", titulo, ubicacion, visible) FROM stdin;
1	/uploads/1757731463479-JPG_BANNER_SIN_LOGO_1220x240.webp		2025-09-12 00:00:00	2025-09-12 00:00:00	ddddd	carrusel	t
2	/uploads/1757731530644-JPG_BANNER_SIN_LOGO_1220x240.webp		2025-09-12 00:00:00	2025-09-26 00:00:00	scscdcsdc	header-bg	t
3	/uploads/1757731563425-photo_2025-08-09_16-49-23.webp		2025-09-10 00:00:00	2025-09-17 00:00:00	cdcs	main-1	t
4	/uploads/1757731594991-photo_2025-08-09_16-49-23.webp		2025-10-02 00:00:00	2025-09-24 00:00:00	aaa	main-2	t
5	/uploads/1757731711810-photo5156734239377566251-768x768.webp		2025-09-19 00:00:00	2025-09-30 00:00:00	ss	side-1	t
6	/uploads/1757731787753-photo_2025-08-08_14-48-53.webp		2025-09-30 00:00:00	2025-09-18 00:00:00	sss	side-2	t
7	/uploads/1757731807274-1752963518302-7442sss41672.webp		2025-09-25 00:00:00	2025-09-15 00:00:00	sas	side-3	t
\.


--
-- Data for Name: Editorial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Editorial" (id, titulo, contenido, fecha, autor) FROM stdin;
1	¿Qué pasará con David Martínez tras la llegada de esta figura?	jhgjhgjhgjhgjhgjhgjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh	2025-09-12 00:00:00	hector
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Media" (id, url, tipo, descripcion, "editorialId", "opinionId") FROM stdin;
1	/uploads/1757730441300-Captura_desde_2025-09-10_22-11-17.webp	imagen	\N	\N	\N
2	/uploads/1757730458624-1752962711459-538223501.webp	imagen	\N	\N	\N
3	/uploads/1757731990034-1754508122611.webp	imagen	\N	\N	\N
4	/uploads/1757878560654-1.-Gobernador_Donald_Donaire_fortalece_lazos_con_el_Poder_Popular_Hurac__n_comunero__3_.webp	imagen	\N	\N	\N
5	/uploads/1757878642267-1.-Gobernador_Donald_Donaire_fortalece_lazos_con_el_Poder_Popular_Hurac__n_comunero__3_.webp	imagen	\N	\N	\N
6	/uploads/1757878760771-photo_2025-09-12_15-31-29.webp	imagen	\N	\N	\N
7	/uploads/1757878770547-photo_2025-09-12_15-31-29.webp	imagen	\N	\N	\N
8	/uploads/1757878793273-photo_2025-09-12_15-31-29.webp	imagen	\N	\N	\N
9	/uploads/1757879047735-TOMAS_AEREAS__1_.webp	imagen	\N	\N	\N
10	/uploads/1757879129408-photo_7_2025-09-12_11-16-54.webp	imagen	\N	\N	\N
11	/uploads/1757879168966-photo_2_2025-09-12_11-16-54.webp	imagen	\N	\N	\N
12	/uploads/1757879513527-2.-Mesas_de_trabajo_en_los_distintos_municipios_fueran_conformadas___1_.webp	imagen	\N	\N	\N
13	/uploads/1757879599093-photo_3_2025-09-12_11-11-15.webp	imagen	\N	\N	\N
14	/uploads/1757879920381-Soraya.webp	imagen	\N	\N	\N
15	/uploads/1757880301078-photo_2025-09-12_10-43-31.webp	imagen	\N	\N	\N
16	/uploads/1757880553403-photo_2025-09-12_10-43-29.webp	imagen	\N	\N	\N
17	/uploads/1757880912934-Veh__culos_rehabilitados_en_el_parque_automotor_en_el_Complejo_Agroindustrial_Pedro_Camejo__2_.webp	imagen	\N	\N	\N
18	/uploads/1757880969955-photo_6_2025-09-12_09-00-23.webp	imagen	\N	\N	\N
19	/uploads/1757881260667-photo_2025-09-11_21-59-54.webp	imagen	\N	\N	\N
20	/uploads/1757881926198-6.-Gobernador_Donald_Donaire_comprometido_con_el_sentido_de_partencia_hist__rica_aprob___la_rehabilitaci__n_del_antiguo_hotel_termal____1_.webp	imagen	\N	\N	\N
21	/uploads/1757881975562-1.-Gu__rico_cuenta_con_nuevo_potencial_tur__stico_para_el_disfrute_de_toda_la_poblaci__n___1_.webp	imagen	\N	\N	\N
22	/uploads/1757882261862-escalada__1_.webp	imagen	\N	\N	\N
23	/uploads/1757991346130-1752963518302-744241672.webp	imagen	\N	\N	\N
24	/uploads/1757991433045-1752962711459-538223501.webp	imagen	\N	\N	\N
25	/uploads/1757993783942-1752962711459-538223501.webp	imagen	\N	\N	\N
26	/uploads/1757993803034-1754508122611.webp	imagen	gjhgjhgjhgjhgjhgjhgjh	\N	\N
27	/uploads/1757994348600-firma.webp	imagen	\N	\N	\N
28	/uploads/1757996087523-Captura_desde_2025-09-15_23-46-35.webp	imagen	\N	\N	\N
\.


--
-- Data for Name: Noticia; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Noticia" (id, titulo, contenido, resumen, "autorTexto", "autorFoto", destacada, "fechaPublicacion", "createdAt", "updatedAt", "seccionId") FROM stdin;
5	Guárico marcó un hito productivo en los primeros 100 días de gestión del gobernador Donald Donaire 	<p>En el marco de los primeros 100 días de gobierno, del gobernador del estado Guárico, Donald Donaire, se lograron grandes avances en&nbsp; el desarrollo agroeconómico da la entidad llanera, esto dando cumplimiento a la primera T de las 7 transformaciones que instruyó el presidente de la república, Nicolás Maduro, que va consonó con el nuevo modelo económico, que permite a las comunas y consejos comunales el desarrollo agrícola y pecuario.</p><p>En este sentido, es importante resaltar, que el gobernador de la entidad, Donald Donaire, marcó un hito en estos primeros 100 días en cuento a lo productivo, mediante una iniciativa que propuso&nbsp; en campaña y tiene que ver con la siembra de un banco de semilla, fueron más de 307 hectáreas divididas en 240 hectáreas de maíz blanco variedad Turen y 67 de maíz amarillo variedad Guanape, esto permitirá la siembra de 40.000 hectáreas para el próximo ciclo; asimismo, se sembraron de 20 hectáreas de arroz que también permitirá la siembra de mayor hectáreas y ayudará a la producción de las comunas y los circuitos comunales, por primera en la historia, en un estado tan&nbsp; productivo como Guárico se toma la iniciativa de proveer las herramientas necesarias para el apalancamiento productivo, con semilla propia.</p><img src="/uploads/1757879047735-TOMAS_AEREAS__1_.webp"><p>Por otro lado, se impulsó la recuperación de un cebadero de ganado bovino que podría albergar más de 3.000 animales, para ello se sembró sorgo forrajero para garantizarle la alimentación adecuada a los animales, esto en al marco de la recuperación del área ganadera de la empresa socialista de Riego Río Tiznados.</p><p>Igualmente, fueron más de 250,000 mil alevines de la especie Coporo los que sembraron en las diferentes lagunas y embalses en todo el estado Guárico, luego de ser cultivados en las 9 lagunas artificiales en la empresa socialista de Riego Río Tiznados, esta producción de carne de pescados, es distribuida en los circuitos comunales a nivel local y regional, mientras que a nivel nacional Guárico es indicativo de garantía de producción de proteína animal, el mismo orden de ideas pero en diferente rubro, se pudo observar que, en casas de cultivo, donde destacan rubros como el pimentón, la cebolla, además de proteína natural, como frijoles, caraotas y más, se llegó a producir lo que representa el 10% de aporte al consumo per cápita regional solo en pimentón.</p><img src="/uploads/1757879129408-photo_7_2025-09-12_11-16-54.webp"><p>Siendo así, esto produce empleos directos e indirectos, que de una u otro forma benefician a la familia guariqueña, finalmente, en todo lo que tiene que ser con el parqué auto motor del sector productivo, hubo un avance en recuperación de camiones, tractores, entre otros, si esto solo fue en 100 días, muy seguramente, la secretaria económica, junto al ministerio de agricultura, concretarán lo que para Guárico será un milagro productivo.</p>	En el marco de los primeros 100 días de gobierno, del gobernador del estado Guárico, Donald Donaire, se lograron grandes avances en  el desarrollo agroeconómico da la entidad llanera, esto dando cumplimiento a la primera T de las 7 transformaciones que instruyó el presidente de la república, Nicolás	Wilmer Matos 	Archivo Sibci 	t	2025-09-14 19:46:10.124	2025-09-14 19:46:10.124	2025-09-14 19:46:10.124	5
10	Guárico continúa elevando su potencial turístico 	<p>Guárico es un destino atrayente con&nbsp; maravillosas riquezas turísticas y naturales, que representa un estado&nbsp; vigoroso con altos potenciales a nivel turístico, donde el gobernador Donald Donaire, en sus primeros 100 días de gestión, ha elevado el sector turismo significativamente sus niveles con la apertura de nuevas rutas turísticas en diversos municipios de la entidad.</p><p></p><p>En este sentido, dentro de las rutas más destacadas se encuentra la Experiencia Aguaro Guariquito ubicado en la parroquia Las Mercedes del Llano municipio Juan José Rondón; Tierra de Palma y Sol, municipio Leonardo Infante; Las Atenas del Llano, municipio Pedro Zaraza, Embalse de Tierra Blanca, El Castrero en el municipio Roscio, &nbsp;entre otros.</p><p></p><p>Asimismo Donaire acotó que a estos nuevos &nbsp;logros &nbsp;se incorpora la rehabilitación integral del antiguo Hotel Termal, ubicado en la capital guariqueña, consolidándose un hito histórico de trascendencia para la región llanera. Y a su vez, la integración de la Casa Amarilla como una casa histórica que estará abierta al pueblo para recorrer su historia.</p><img src="/uploads/1757881926198-6.-Gobernador_Donald_Donaire_comprometido_con_el_sentido_de_partencia_hist__rica_aprob___la_rehabilitaci__n_del_antiguo_hotel_termal____1_.webp"><p></p><p>Además, a esto se le suma un importante centro turístico como lo es el Hotel &amp; Spa Aguas Termales de San Juan de los Morros, conteniendo una importante capacidad hotelera para propios y visitantes.</p><p></p><p>Es por ello que el Gobierno Bolivariano en Guárico, de la mano con el presidente Nicolás Maduro y con el Ministerio del Poder Popular Para el Turismo, en Guárico con el gobernador Donald Donaire &nbsp;y con la autoridad única de Turismo en la región Norelys Andara, se sigue trabajando en pro de generar espacios dignos para el sano esparcimiento.</p>	Guárico es un destino atrayente con  maravillosas riquezas turísticas y naturales, que representa un estado  vigoroso con altos potenciales a nivel turístico, donde el gobernador Donald Donaire, en sus primeros 100 días de gestión, ha elevado el sector turismo significativamente sus niveles con la a	Luisana Villarroel 	Archivo Sibci 	f	2025-09-14 20:32:56.324	2025-09-14 20:32:56.324	2025-09-14 20:32:56.324	8
6	Sector Cultura en Guárico entró con hechos en los primeros 100 días de gestión del gobernador Donaire	<p>“Sin cultura no somos nada”, fueron palabras expresadas por el gobernador, del estado Guárico, Donald Donaire, cuando decidió darle cabida en su gestión de gobierno a los cultores de la entidad llanera, con el objetivo de profundizar mediante la cultura el sentido de pertenencia, por lo cual, durante sus&nbsp; primeros 100 días de gobierno ha implementado diversos trabajos que le han permitido a los representantes de la cultura por primera sentirse tomados en cuenta, recordando que la cultura es la memoria del pueblo, la conciencia colectiva de la continuidad histórica y la forma de pensar y vivir de muchos.</p><p>&nbsp;</p><p>De esta forma, el líder social, gobernador Donald Donaire, invitó a los cultores de diferentes municipios del estado a la conformación de mesas de trabajo, que tuvieron como meta crear el Estado Mayor de Cultura, este encuentro se llevó a cabo en las instalaciones de lo que para ese momento era la residencia oficial del gobernador, hoy, la Casa del Pueblo, una decisión que tomó, que también salta a lo turístico, puesto que la Casa Amarilla es un atractivo histórico que visitantes también podrán disfrutar,&nbsp; así se propuso la creación de una ley que sustenta esta decisión.</p><img src="/uploads/1757879513527-2.-Mesas_de_trabajo_en_los_distintos_municipios_fueran_conformadas___1_.webp"><p></p><p>Asimismo, no solo se conformaron mesas de trabajos y se dio acceso total a la cultura y al pueblo a la Casa Amarilla, sino que además, se aprobó la recuperación de la Casa de la Cultura Dr. Víctor Manuel Ovalles, en San Juan de los Morros, capital del estado Guárico. &nbsp;Una casa cultural habitada por niños y niñas, jóvenes y adultos y que nunca antes fue considerada o tomada en cuanta, lo que causó gran contento en la población y definió el rumbo del sector cultura, estas acciones también fueron llevadas a los 15 municipios de la entidad, ya que cada representante se fue a cada territorio a escuchar al pueblo cultor.</p>	“Sin cultura no somos nada”, fueron palabras expresadas por el gobernador, del estado Guárico, Donald Donaire, cuando decidió darle cabida en su gestión de gobierno a los cultores de la entidad llanera, con el objetivo de profundizar mediante la cultura el sentido de pertenencia.	Wilmer Matos 	Archivo Sibci 	t	2025-09-14 19:53:19.52	2025-09-14 19:53:19.52	2025-09-14 19:53:19.52	4
2	Más territorio, menos escritorio: Así se fortalece el Poder Popular en Guárico con el gobernador Donaire	<p>En el marco de los primeros 100 días de gestión del Gobernador del estado Guárico, Donald Donaire, se han llevado a cabo diversas acciones en el área de comunas, con el objetivo de seguir construyendo soluciones desde el territorio y fortalecer el crecimiento y trabajo mancomunado entre los comuneros y comuneras en los 261 circuitos comunales en el estado Guárico.</p><p>En este sentido, se destacan acciones comola entrega de "Trabucos Clap", entrega de semillas lo cual representa un avance significativo hacia la soberanía alimentaria yrehabilitación de calles que facilitan la ejecución de proyectos derivados de la consulta popular nacional, dando espacio a la formación en el área de comunas lo ha sido un pilar fundamental en esta gestión, con iniciativas como "La Comuna es Joven", la Consulta Popular del Proyecto Juvenil, y la formación para formadores, organizada por Encomuna, el Ministerio de las Comunas y Fundacomunal, ha sido esencial para impulsar las 7 Transformaciones propuestas por el Presidente Nicolás Maduro.</p><img src="/uploads/1757878642267-1.-Gobernador_Donald_Donaire_fortalece_lazos_con_el_Poder_Popular_Hurac__n_comunero__3_.webp"><p>Del mismo modo, más de 300 trabajadores del Huracán Comunero han recibido atención médica en 8 áreas, junto con la entrega de medicamentos gratuitos. También se ha beneficiado a parceleros con la instalación de paneles solares, promoviendo así el acceso a energías sostenibles en la región.</p><p>Asimismo, se han llevado a cabo encuentros entre funcionarios de la Policía Estadal del Cuadrante de Paz, voceros comunales, jefes de comunidad y representantes de la Sala de Autogobierno, abordando temas relacionados con la convivencia pacífica y la prevención ciudadana. Con el lema "Más Territorio, Menos Escritorios", se han ejecutado juegos deportivos comunales y se han establecido Salas de Autogobierno Comunal. La Universidad Nacional de las Comunas (Unacom) ha impulsado programas de formación para docentes comunitarios, articulando esfuerzos que impactan directamente en el bienestar del pueblo guariqueño. Recientemente, se realizó un taller sobre Organizaciones Socioproductivas (O.S.P) en el Circuito Vencedores de Guárico, ubicado San Juan de los Morros.</p><p>Es importante mencionar que, la gestión del Gobernador Donald Donaire sigue avanzando con fuerza y compromiso hacia un Guárico más próspero y solidario con el desarrollo integral de las comunidades impulsando las vocerías comunitarias, promotores y líderes locales ratificando el impulso de iniciativas productivas desde lo territorial para consolidar el poder popular y garantizar una gestión comunal más organizada y efectiva.</p>	En el marco de los primeros 100 días de gestión del Gobernador del estado Guárico, Donald Donaire, se han llevado a cabo diversas acciones en el área de comunas, con el objetivo de seguir construyendo soluciones desde el territorio y fortalecer el crecimiento y trabajo mancomunado entre los comunero	Sandy Carvajal 	PCP	f	2025-09-14 19:39:25.472	2025-09-14 19:39:25.472	2025-09-14 20:09:14.951	1
7	Iluminando Guárico: Donald Donaire acelera la transformación eléctrica en sus primeros 100 días de gestión 	<p>En marco de los primeros 100 días de gestión del gobernador Donald Donaire, el estado Guárico ha experimentado una notable transformación en el sector eléctrico. Las acciones, enmarcadas en la 2da Transformación (Ciudades más Humanas) del Plan de las 7T, han llevado luz y eficiencia a diversas comunidades y avenidas principales, impactando positivamente la calidad de vida de sus habitantes.</p><p>&nbsp;</p><p>‎El epicentro de esta revitalización ha sido el Plan de Electrificación de San Juan de los Morros. Este ambicioso proyecto, liderado por el gobernador Donaire, ha mejorado sustancialmente el servicio eléctrico en arterias viales primordiales de la capital, como las avenidas Los Llanos, Lazo Martí, Fermín Toro y Rómulo Gallegos, que ahora lucen completamente renovadas y con un alumbrado público eficiente, brindando mayor seguridad y bienestar a los sanjuaneros.</p><p></p><img src="/uploads/1757880301078-photo_2025-09-12_10-43-31.webp"><p></p><p>De esta manera, la gestión del gobernador también se ha enfocado en fortalecer la infraestructura eléctrica en otras localidades. En las parroquias Tucupido y San Rafael de Laya, se ha dispuesto la instalación de un transformador de 25 KVA y 100 luminarias, mejorando el suministro y la calidad del servicio para estas importantes comunidades del estado.</p><p>&nbsp;</p><p>‎Un ejemplo tangible de la atención directa a las necesidades del pueblo es la inspección realizada por el gobernador Donald Donaire, junto al alcalde del municipio Ribas, Daniel Charaima, en el sector El Tranquero, de la parroquia Tucupido. Allí, supervisaron la instalación de un transformador destinado a beneficiar directamente a esta comunidad, demostrando la eficacia y respuesta inmediata del Sistema 1x10 del Buen Gobierno.</p><p>&nbsp;</p><p>‎Además, el compromiso del gobernador Donaire con todo el estado Guárico se evidencia con el envío de dos camiones cargados con transformadores, destinados a fortalecer y beneficiar a diversas localidades como Valle de la Pascua, Parapara, Ortiz, El Rastro, Calabozo, Camaguán y Las Mercedes, entre otras, recibiendo estos recursos esenciales para sus sistemas de iluminación y electrificación.</p><p>&nbsp;</p><p>‎Como parte de este esfuerzo integral para la modernización de los servicios, la avenida Luis Aparicio, en San Juan de los Morros, también fue objeto de una significativa rehabilitación en su sistema de iluminación. Esta acción se suma a las mejoras realizadas en otras arterias viales, consolidando una capital más iluminada y segura.</p><p>&nbsp;</p><p>‎Con estas acciones contundentes en sus primeros 100 días, el gobernador Donald Donaire reafirma su inquebrantable compromiso con el pueblo guariqueño. "Esto se hace por amor a Guárico", ha expresado el mandatario, asegurando que continuará trabajando sin descanso por el bienestar de todo el estado, llevando progreso y un futuro más brillante a cada rincón de la región llanera.</p>	En marco de los primeros 100 días de gestión del gobernador Donald Donaire, el estado Guárico ha experimentado una notable transformación en el sector eléctrico. Las acciones, enmarcadas en la 2da Transformación (Ciudades más Humanas) del Plan de las 7T, han llevado luz y eficiencia a diversas comun	Saray Sumoza	Archivo Sibci 	t	2025-09-14 20:09:14.954	2025-09-14 20:09:14.954	2025-09-14 20:09:14.954	1
8	Más vehículos, más desarrollo: 100 días del gobernador de Guárico que impulsa el progreso en la región 	<p>En el marco de los primeros 100 días de gestión del gobernador Donald Donaire, el gobierno regional ha intensificado sus esfuerzos para mejorar la calidad de vida de los habitantes del estado Guárico. Desde su toma de posesión, Donaire ha liderado una gestión caracterizada por el trabajo constante y progresivo, enfocándose en el desarrollo de la infraestructura y el bienestar de la comunidad guariqueña con iniciativas como la reactivación del parque automotor en el Complejo Agroindustrial Pedro Camejo.</p><p>&nbsp;</p><p>En este sentido, este parque&nbsp; automotor&nbsp; ubicado en Calabozo, municipio Miranda. Gracias a un esfuerzo conjunto, se han recuperado camiones modelo volteos que se encontraban inoperativos. Este proceso integral incluyó el cambio de motores, cauchos, aceite y luces, lo que ha permitido que estos vehículos cuenten ahora con total operatividad.</p><p>&nbsp;</p><p>&nbsp;Esta acción no solo mejora la eficiencia en las labores del municipio, sino que también representa un claro compromiso del Gobierno Bolivariano por fortalecer la infraestructura y asegurar un futuro más próspero para todos los ciudadanos guariqueños.</p><img src="/uploads/1757880912934-Veh__culos_rehabilitados_en_el_parque_automotor_en_el_Complejo_Agroindustrial_Pedro_Camejo__2_.webp"><p>Del mismo modo, el gobernador Donald Donaire ha enfatizado la importancia de estas acciones, manifestando que el pueblo merece el esfuerzo, y se está trabajando con la voluntad de hacer las cosas bien. Este enfoque ha guiado la priorización en la recuperación de la maquinaria amarilla en la región, vehículos para las instituciones de salud, la Corporación Eléctrica Nacional (Corpoelec) y obras públicas, siguiendo las instrucciones del presidente Nicolás Maduro.</p><p>&nbsp;</p><p>En el ámbito agrícola, se han realizado avances significativos con la recuperación de tractores los cuales ya están en funcionamiento y en su debido uso. Asimismo, entre estos avances se destaca la incorporación de los motores modelo D6T, así como los cauchos necesarios para garantizar su operatividad dando así una mayor vida útil a estos vehículos que se requerían una rehabilitación totalmente completa en su área automotora.</p><p>&nbsp;</p><p>Por su parte el mandatario regional, ha enfocado esfuerzos en la mejora del servicio de transporte en el estado Guárico, destacando la labor de la Secretaría de Transporte. Entre las acciones implementadas, se han llevado a cabo reuniones con transportistas locales para escuchar sus necesidades y proponer soluciones efectivas. Además encomendó inspeccionar todas las unidades de Bus Guárico que se encuentran inoperativas.</p><p>&nbsp;</p><p>Es importante mencionar que, a pesar de los desafíos, el gobernador Donald Donaire continúa trabajando y avanzando hacia el bienestar de los habitantes de la región llanera, brindando oportunidades y beneficios a cada rincón del estado. La gestión del gobernador Donaire es un testimonio del esfuerzo constante por mejorar la calidad de vida de los guariqueños.</p>	Desde su toma de posesión, Donaire ha liderado una gestión caracterizada por el trabajo constante y progresivo, enfocándose en el desarrollo de la infraestructura y el bienestar de la comunidad guariqueña con iniciativas como la reactivación del parque automotor en el Complejo Agroindustrial Pedro Camejo.	Sandy Carvajal 	Archivo Sibci 	f	2025-09-14 20:16:11.216	2025-09-14 20:16:11.216	2025-09-14 20:17:17.686	1
9	De la promesa a la acción: Los resultados de los primeros 100 días de gestión hídrica en Guárico	<p>En sus primeros 100 días de gestión, el gobernador Donald Donaire ha impulsado una agenda transformadora en el estado Guárico, mejorando cada uno de los sectores importantes que conforman su gestión, con un énfasis en el área de servicios públicos. Específicamente en el suministro de agua potable, el ejecutivo regional, a través del ingeniero Hecduar López, secretario de Servicios Públicos, ha ejecutado importantes obras que ya benefician a miles de familias guariqueñas.</p><p>&nbsp;</p><p>‎La visión del gobernador Donaire, centrada en el bienestar del pueblo, se ha materializado en acciones concretas que garantizan un acceso más eficiente y de calidad al vital líquido. Los trabajos realizados, en articulación con la Dirección de Hidráulica y el personal de Hidropáez, han logrado la reactivación y optimización de acueductos en diferentes municipios.</p><p>‎</p><p>‎Obras destacadas en el suministro de agua y electrificación:</p><p>‎</p><p>‎Asimismo, desde el municipio San Jerónimo de Guayabal, en el sector Cazorla, se instaló una bomba y un motor sumergible de 20 HP, dejando el acueducto totalmente operativo y asegurando el suministro a la comunidad.</p><p>&nbsp;</p><p>‎Por consiguiente, el municipio Juan Germán Roscio Nieves, específicamente, en la capital de San Juan de los Morros, se realizó la limpieza y aforo del pozo profundo ubicado en el Centro de Reclusión para procesados judiciales “26 de Julio”, mejorando significativamente el servicio de agua en este importante centro. Asimismo, en el Pozo Nº 1, se instaló un equipo sumergible de 15 HP con su empalme de resina, 60 metros de cable sumergible y un tablero de protección y control, beneficiando a más de 60 sectores a lo largo de la Avenida José Félix Ribas.</p><p>&nbsp;</p><p>‎Así, desde el sector La Ceiba, del municipio Ortiz, se realizaron importantes trabajos que incluyeron la colocación de acometida eléctrica, un térmico, la instalación y prueba de una bomba centrífuga de 40 HP con arranque directo, para luego continuar con la limpieza de la galería filtrante, garantizando el suministro de agua potable en óptimas condiciones.</p><p>&nbsp;</p><p>‎Además, para el sector La Caimana, se sustituyó un equipo sumergible de 5.5 HP trifásico, dejando el acueducto totalmente operativo. &nbsp;Por último, el sector Guaitoco recibió la activación del acueducto tras reparar una falla en el conductor y el contactor del tablero, beneficiando directamente a 250 familias. Siguiendo el mismo orden de ideas, el Municipio José Tadeo Monagas, en especial desde Altagracia de Orituco, el sector Turmerino se benefició con la reparación de un tablero que aseguró el buen funcionamiento de un motor de 10 HP trifásico, dejando el acueducto completamente operativo.</p><p>&nbsp;</p><p>‎De igual manera, en el sector Samanito, se realizó la limpieza y aforo del pozo, y se instaló un equipo sumergible de 7.5 HP, dejando el acueducto totalmente operativo.</p><p>‎Es así como, desde el municipio Chaguaramas, en su sector La Morrocoya, se instaló un equipo sumergible de 3 HP monofásico con su caja de arrancadora y empalme de resina, dejando el acueducto completamente operativo y beneficiando a 90 familias.</p><p>‎El gobernador Donald Donaire y su equipo de gestión demuestran con estas acciones que su compromiso por el bienestar de Guárico es una prioridad ineludible. Continuará con esta gran gestión que le regala al pueblo bienestar, buenas nuevas y consolida a la región como tierra de prosperidad y avances.</p><p>‎</p>	En el suministro de agua potable, el Ejecutivo Regional, liderado por Donald Donaire de la amano del ingeniero Hecduar López, secretario de Servicios Públicos, ha ejecutado importantes obras que ya benefician a miles de familias guariqueñas.	Saray Sumoza	Archivo Sibci 	f	2025-09-14 20:21:00.975	2025-09-14 20:21:00.975	2025-09-14 20:21:00.975	1
11	Guárico se consolida como epicentro deportivo con la Segunda Válida Nacional de Escalada 	<p>En un ambiente cargado de energía, disciplina y pasión, inició en el majestuoso Muro de Escalada de la Ciudad Olímpica de San Juan de los Morros la Segunda Válida Nacional de Escalada Deportiva en la modalidad Bloque, evento que reúne a los mejores atletas del país y que ratifica el compromiso del Gobierno Bolivariano del presidente Nicolás Maduro y del gobernador del estado Guárico, Donald Donaire, con el impulso del deporte en todas sus disciplinas.</p><p>En esta justa nacional participan delegaciones de Miranda, Caracas, Carabobo, Aragua, Mérida, Trujillo y Guárico, compitiendo en las categorías: Sub 15, Sub 16, Sub 17, Sub 18, Sub 19, Sub 20, Sub 21, Senior (21+ años) y Open (15+ años), lo que convierte a este evento en una plataforma para el desarrollo del talento juvenil y de alto rendimiento.</p><p>En este sentido, Yosbany González, director de Alto Rendimiento, expresó su satisfacción por el desarrollo de la válida y agradeció al Ejecutivo regional por el respaldo “Nos encontramos en nuestra bella Ciudad Olímpica, donde se lleva a cabo la segunda válida nacional en la modalidad bloque. Agradecemos profundamente a nuestro gobernador Donald Donaire por todo el apoyo brindado a nuestros atletas y a la delegación guariqueña para hacer posible esta actividad”, afirmó.</p><p>A su vez, el guariqueño Gianstefano Di Nino manifestó el orgullo de representar a su estado “Estamos los mejores escaladores del país, ya hemos culminado la ronda clasificatoria y seguimos demostrando la fuerza del talento guariqueño”.</p><p>Por su parte, María Santaella destacó el esfuerzo de su equipo en la preparación previa “Estoy muy feliz de participar en esta segunda válida nacional. Venimos trabajando con mucha disposición y disciplina, y hoy queremos mostrar los frutos de ese esfuerzo”.</p><p>Asimismo, la atleta Patricia Laya resaltó el respaldo institucional que ha hecho posible la actividad “Quiero agradecer a la Gobernación del estado Guárico, al Instituto del Deporte y a la Federación Venezolana de Escalada. Me siento muy orgullosa de competir en este evento y vengo con la mejor disposición de lograr todos mis objetivos”.</p><p>De esta manera, el gobernador Donald Donaire, reafirma su compromiso con la capital deportiva del centro del país, al albergar competencias de talla nacional que fortalecen el semillero de atletas y promueven valores como la disciplina, la constancia y la excelencia. Todo ello bajo la orientación del presidente Nicolás Maduro con el objetivo de continuar garantizando espacios dignos y de calidad para el desarrollo integral de la juventud venezolana.</p>	Inició en el majestuoso Muro de Escalada de la Ciudad Olímpica de San Juan de los Morros la Segunda Válida Nacional de Escalada Deportiva en la modalidad Bloque.	Esmeralda Jiménez 	Archivo Sibci 	f	2025-09-14 20:37:42.984	2025-09-14 20:37:42.984	2025-09-14 20:37:42.984	3
12	sdds	<p>sdsd</p>	sdsdd	meridiano	meridiano	f	2025-09-16 02:57:13.453	2025-09-16 02:57:13.453	2025-09-16 02:57:13.453	5
13	holaaa	<p>hjhgjhgjhgjhgjhgjhgjhgjhg</p><img src="/uploads/1757993783942-1752962711459-538223501.webp"><p></p>	hkjahkjhkajhkajhkajhakjhkjhkjhkjhakjhakjhakjahka	meridiano	meridiano	f	2025-09-16 03:36:43.222	2025-09-16 03:36:43.222	2025-09-16 03:36:43.222	10
\.


--
-- Data for Name: NoticiaMedia; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."NoticiaMedia" ("noticiaId", "mediaId") FROM stdin;
2	6
5	11
6	13
7	16
8	18
9	19
10	21
11	22
12	24
13	26
\.


--
-- Data for Name: Opinion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Opinion" (id, titulo, contenido, fecha, "columnistaId", destacado) FROM stdin;
1	ddddd	bmnbmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn	2025-09-12 00:00:00	1	f
\.


--
-- Data for Name: PDF; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PDF" (id, url, fecha, descripcion) FROM stdin;
\.


--
-- Data for Name: Rol; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Rol" (id, nombre) FROM stdin;
1	admin
\.


--
-- Data for Name: Seccion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Seccion" (id, nombre) FROM stdin;
1	Gestión
2	Municipales
3	Deportes
4	Cultura
5	Producción
6	Comunidad
7	Seguridad
8	Turismo
9	Educación
10	Salud
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Usuario" (id, username, password, "createdAt") FROM stdin;
1	admin	$2b$12$f/Cl5ACxR5N6hE0I9TMGmOk7FXSrt75yHxUUPidRHQq1YJ.XIxYPS	2025-09-12 03:08:46.903
\.


--
-- Data for Name: UsuarioRol; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsuarioRol" ("usuarioId", "rolId") FROM stdin;
1	1
\.


--
-- Data for Name: View; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."View" (id, nombre, descripcion, tipo, configuracion, activo, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6320e47b-a8ce-482d-8976-04b2c3f3f69f	d700444c7ac8664256be2bbcebb0b5819667787156ea3619528bf07cdba8ae60	2025-09-12 00:45:31.319426+00	20250730153952_init	\N	\N	2025-09-12 00:45:28.731456+00	1
be6811fa-f330-4144-8a5c-609ff2ef6b55	b5f39730726e92a918824cc6481ef0d51403d33199af6b969aacde65947146d6	2025-09-12 00:45:31.476831+00	20250731150839_rename_publicidad_to_contenido_destacado	\N	\N	2025-09-12 00:45:31.321312+00	1
6fc5cfe6-ebeb-40e5-ac80-6386b6352917	f29481e09527ee1cf365f6ba29299d52c56907e8f0aeba402fd317fe68e81180	2025-09-12 00:45:32.24532+00	20250803202147_add_opinion_section_relations	\N	\N	2025-09-12 00:45:31.478543+00	1
\.


--
-- Name: Columnista_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Columnista_id_seq"', 2, true);


--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ContenidoDestacado_id_seq"', 7, true);


--
-- Name: Editorial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Editorial_id_seq"', 1, true);


--
-- Name: Media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Media_id_seq"', 28, true);


--
-- Name: Noticia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Noticia_id_seq"', 13, true);


--
-- Name: Opinion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Opinion_id_seq"', 1, true);


--
-- Name: PDF_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PDF_id_seq"', 1, false);


--
-- Name: Rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Rol_id_seq"', 3, true);


--
-- Name: Seccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Seccion_id_seq"', 10, true);


--
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 4, true);


--
-- Name: View_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."View_id_seq"', 1, false);


--
-- Name: Columnista Columnista_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Columnista"
    ADD CONSTRAINT "Columnista_pkey" PRIMARY KEY (id);


--
-- Name: ContenidoDestacado ContenidoDestacado_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContenidoDestacado"
    ADD CONSTRAINT "ContenidoDestacado_pkey" PRIMARY KEY (id);


--
-- Name: Editorial Editorial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Editorial"
    ADD CONSTRAINT "Editorial_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: NoticiaMedia NoticiaMedia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_pkey" PRIMARY KEY ("noticiaId", "mediaId");


--
-- Name: Noticia Noticia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_pkey" PRIMARY KEY (id);


--
-- Name: Opinion Opinion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Opinion"
    ADD CONSTRAINT "Opinion_pkey" PRIMARY KEY (id);


--
-- Name: PDF PDF_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PDF"
    ADD CONSTRAINT "PDF_pkey" PRIMARY KEY (id);


--
-- Name: Rol Rol_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rol"
    ADD CONSTRAINT "Rol_pkey" PRIMARY KEY (id);


--
-- Name: Seccion Seccion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Seccion"
    ADD CONSTRAINT "Seccion_pkey" PRIMARY KEY (id);


--
-- Name: UsuarioRol UsuarioRol_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("usuarioId", "rolId");


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: View View_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."View"
    ADD CONSTRAINT "View_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Rol_nombre_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Rol_nombre_key" ON public."Rol" USING btree (nombre);


--
-- Name: Seccion_nombre_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Seccion_nombre_key" ON public."Seccion" USING btree (nombre);


--
-- Name: Usuario_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Usuario_username_key" ON public."Usuario" USING btree (username);


--
-- Name: Media Media_editorialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_editorialId_fkey" FOREIGN KEY ("editorialId") REFERENCES public."Editorial"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Media Media_opinionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES public."Opinion"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: NoticiaMedia NoticiaMedia_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: NoticiaMedia NoticiaMedia_noticiaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES public."Noticia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Noticia Noticia_seccionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES public."Seccion"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Opinion Opinion_columnistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Opinion"
    ADD CONSTRAINT "Opinion_columnistaId_fkey" FOREIGN KEY ("columnistaId") REFERENCES public."Columnista"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsuarioRol UsuarioRol_rolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES public."Rol"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsuarioRol UsuarioRol_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict dMbL0Up00auSsyUwGXnZ0mzHCLYS1C2I06b2WB3kvkf17eaB0ZA3JsPdtWGES7e

