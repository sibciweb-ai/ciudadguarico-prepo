--
-- PostgreSQL database dump
--

\restrict IwcTmNmJ32b3NNgTgipix2kK71zcmJWKTi8ygS6G9kB2u9LogALgLhMUaoGpvtR

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
-- Name: MediaTipo; Type: TYPE; Schema: public; Owner: cg_user
--

CREATE TYPE public."MediaTipo" AS ENUM (
    'imagen',
    'video',
    'pdf'
);


ALTER TYPE public."MediaTipo" OWNER TO cg_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Columnista; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Columnista" (
    id integer NOT NULL,
    nombre text NOT NULL,
    bio text NOT NULL,
    "fotoUrl" text,
    redes jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Columnista" OWNER TO cg_user;

--
-- Name: Columnista_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Columnista_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Columnista_id_seq" OWNER TO cg_user;

--
-- Name: Columnista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Columnista_id_seq" OWNED BY public."Columnista".id;


--
-- Name: ContenidoDestacado; Type: TABLE; Schema: public; Owner: cg_user
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


ALTER TABLE public."ContenidoDestacado" OWNER TO cg_user;

--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."ContenidoDestacado_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContenidoDestacado_id_seq" OWNER TO cg_user;

--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."ContenidoDestacado_id_seq" OWNED BY public."ContenidoDestacado".id;


--
-- Name: Editorial; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Editorial" (
    id integer NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    autor text
);


ALTER TABLE public."Editorial" OWNER TO cg_user;

--
-- Name: Editorial_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Editorial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Editorial_id_seq" OWNER TO cg_user;

--
-- Name: Editorial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Editorial_id_seq" OWNED BY public."Editorial".id;


--
-- Name: Media; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Media" (
    id integer NOT NULL,
    url text NOT NULL,
    tipo public."MediaTipo" NOT NULL,
    descripcion text,
    "editorialId" integer,
    "opinionId" integer
);


ALTER TABLE public."Media" OWNER TO cg_user;

--
-- Name: Media_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Media_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Media_id_seq" OWNER TO cg_user;

--
-- Name: Media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Media_id_seq" OWNED BY public."Media".id;


--
-- Name: Noticia; Type: TABLE; Schema: public; Owner: cg_user
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


ALTER TABLE public."Noticia" OWNER TO cg_user;

--
-- Name: NoticiaMedia; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."NoticiaMedia" (
    "noticiaId" integer NOT NULL,
    "mediaId" integer NOT NULL
);


ALTER TABLE public."NoticiaMedia" OWNER TO cg_user;

--
-- Name: Noticia_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Noticia_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Noticia_id_seq" OWNER TO cg_user;

--
-- Name: Noticia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Noticia_id_seq" OWNED BY public."Noticia".id;


--
-- Name: Opinion; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Opinion" (
    id integer NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "columnistaId" integer NOT NULL,
    destacado boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Opinion" OWNER TO cg_user;

--
-- Name: Opinion_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Opinion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Opinion_id_seq" OWNER TO cg_user;

--
-- Name: Opinion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Opinion_id_seq" OWNED BY public."Opinion".id;


--
-- Name: PDF; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."PDF" (
    id integer NOT NULL,
    url text NOT NULL,
    fecha timestamp(3) without time zone NOT NULL,
    descripcion text
);


ALTER TABLE public."PDF" OWNER TO cg_user;

--
-- Name: PDF_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."PDF_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PDF_id_seq" OWNER TO cg_user;

--
-- Name: PDF_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."PDF_id_seq" OWNED BY public."PDF".id;


--
-- Name: Rol; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Rol" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Rol" OWNER TO cg_user;

--
-- Name: Rol_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Rol_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Rol_id_seq" OWNER TO cg_user;

--
-- Name: Rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Rol_id_seq" OWNED BY public."Rol".id;


--
-- Name: Seccion; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Seccion" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Seccion" OWNER TO cg_user;

--
-- Name: Seccion_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Seccion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seccion_id_seq" OWNER TO cg_user;

--
-- Name: Seccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Seccion_id_seq" OWNED BY public."Seccion".id;


--
-- Name: Usuario; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO cg_user;

--
-- Name: UsuarioRol; Type: TABLE; Schema: public; Owner: cg_user
--

CREATE TABLE public."UsuarioRol" (
    "usuarioId" integer NOT NULL,
    "rolId" integer NOT NULL
);


ALTER TABLE public."UsuarioRol" OWNER TO cg_user;

--
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Usuario_id_seq" OWNER TO cg_user;

--
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
-- Name: View; Type: TABLE; Schema: public; Owner: cg_user
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


ALTER TABLE public."View" OWNER TO cg_user;

--
-- Name: View_id_seq; Type: SEQUENCE; Schema: public; Owner: cg_user
--

CREATE SEQUENCE public."View_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."View_id_seq" OWNER TO cg_user;

--
-- Name: View_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cg_user
--

ALTER SEQUENCE public."View_id_seq" OWNED BY public."View".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: cg_user
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


ALTER TABLE public._prisma_migrations OWNER TO cg_user;

--
-- Name: Columnista id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Columnista" ALTER COLUMN id SET DEFAULT nextval('public."Columnista_id_seq"'::regclass);


--
-- Name: ContenidoDestacado id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."ContenidoDestacado" ALTER COLUMN id SET DEFAULT nextval('public."ContenidoDestacado_id_seq"'::regclass);


--
-- Name: Editorial id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Editorial" ALTER COLUMN id SET DEFAULT nextval('public."Editorial_id_seq"'::regclass);


--
-- Name: Media id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Media" ALTER COLUMN id SET DEFAULT nextval('public."Media_id_seq"'::regclass);


--
-- Name: Noticia id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Noticia" ALTER COLUMN id SET DEFAULT nextval('public."Noticia_id_seq"'::regclass);


--
-- Name: Opinion id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Opinion" ALTER COLUMN id SET DEFAULT nextval('public."Opinion_id_seq"'::regclass);


--
-- Name: PDF id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."PDF" ALTER COLUMN id SET DEFAULT nextval('public."PDF_id_seq"'::regclass);


--
-- Name: Rol id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Rol" ALTER COLUMN id SET DEFAULT nextval('public."Rol_id_seq"'::regclass);


--
-- Name: Seccion id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Seccion" ALTER COLUMN id SET DEFAULT nextval('public."Seccion_id_seq"'::regclass);


--
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- Name: View id; Type: DEFAULT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."View" ALTER COLUMN id SET DEFAULT nextval('public."View_id_seq"'::regclass);


--
-- Data for Name: Columnista; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Columnista" (id, nombre, bio, "fotoUrl", redes, "createdAt") FROM stdin;
1	hector	hjhgjhgjhgjhgjhgjhg	/uploads/1757731990034-1754508122611.webp	\N	2025-09-13 02:53:14.987
2	Soraya González 	Cronista e historiadora del municipio San José de Guaribe 	/uploads/1757879920381-Soraya.webp	\N	2025-09-14 19:58:47.109
\.


--
-- Data for Name: ContenidoDestacado; Type: TABLE DATA; Schema: public; Owner: cg_user
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
-- Data for Name: Editorial; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Editorial" (id, titulo, contenido, fecha, autor) FROM stdin;
1	¿Qué pasará con David Martínez tras la llegada de esta figura?	jhgjhgjhgjhgjhgjhgjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh	2025-09-12 00:00:00	hector
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: cg_user
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
29	/uploads/1758035628425-photo_2025-09-14_17-00-16.webp	imagen	\N	\N	\N
30	/uploads/1758036014287-Chrysanthemum.webp	imagen	\N	\N	\N
31	/uploads/1758037006692-Desert.webp	imagen	\N	\N	\N
32	/uploads/1758037631787-photo_2025-09-05_16-26-35.webp	imagen	\N	\N	\N
33	/uploads/1758037975687-Altagracia_de_Orituco__1_.webp	imagen	\N	\N	\N
34	/uploads/1758038004500-Chaguaramas__2_.webp	imagen	\N	\N	\N
35	/uploads/1758038110134-Juan_Jos___Rondon__7_.webp	imagen	\N	\N	\N
36	/uploads/1758038141633-Escuela_B__sica_Rep__blica_del_Brasil_da_la_Bienvenida_al_A__o_Escolar_2025-2026.webp	imagen	\N	\N	\N
37	/uploads/1758038471680-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	\N	\N	\N
38	/uploads/1758038585060-photo_2025-09-14_17-00-09.webp	imagen	\N	\N	\N
39	/uploads/1758038651312-photo_2025-09-14_17-00-16.webp	imagen	\N	\N	\N
40	/uploads/1758038673149-photo_2025-09-14_17-00-19.webp	imagen	\N	\N	\N
41	/uploads/1758038693086-photo_2025-09-14_17-00-25.webp	imagen	\N	\N	\N
42	/uploads/1758038722766-photo_2025-09-14_17-00-06.webp	imagen	El gobernador coordina un taller de dos días con alcaldes y administradores para promover la transparencia en la gestión pública	\N	\N
43	/uploads/1758038962727-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	No todo es seguro en internet!!	\N	\N
44	/uploads/1758038963739-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	No todo es seguro en internet!!	\N	\N
45	/uploads/1758038996283-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	\N	\N	\N
46	/uploads/1758039007653-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	No todo es seguro en internet!!	\N	\N
47	/uploads/1758039009466-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	No todo es seguro en internet!!	\N	\N
48	/uploads/1758039108414-Generated_Image_September_02__2025_-_1_51PM.webp	imagen	No todo es seguro en internet!!	\N	\N
49	/uploads/1758039214272-Nota_2_Capital_guarique__a_fue_sede_del_torneo_juvenil_de_voleibol_playa__2_.webp	imagen	\N	\N	\N
50	/uploads/1758039279805-Nota_2_Capital_guarique__a_fue_sede_del_torneo_juvenil_de_voleibol_playa__6_.webp	imagen	\N	\N	\N
51	/uploads/1758039297855-Nota_2_Capital_guarique__a_fue_sede_del_torneo_juvenil_de_voleibol_playa__3_.webp	imagen	San Juan de los Morros se despidió del Invitacional con la satisfacción de haber sido epicentro de una experiencia deportiva enriquecedora	\N	\N
52	/uploads/1758040121379-1002814207.webp	imagen	\N	\N	\N
53	/uploads/1758040218720-1002816493.webp	imagen	\N	\N	\N
54	/uploads/1758040241752-1002816455.webp	imagen	La historia de la parroquia comenzó bajo el mandato del Obispo de Calabozo, Mons. Antonio Ignacio Camargo, quien envió al Presbítero Martín Persa para iniciar la labor pastoral en el pueblo. 	\N	\N
55	/uploads/1758040636699-3.webp	imagen	\N	\N	\N
56	/uploads/1758040642562-5.webp	imagen	\N	\N	\N
57	/uploads/1758040675381-6.webp	imagen	\N	\N	\N
58	/uploads/1758041124154-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__5_.webp	imagen	\N	\N	\N
59	/uploads/1758041172220-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__3_.webp	imagen	\N	\N	\N
60	/uploads/1758041223072-photo_13_2025-09-14_21-00-18.webp	imagen	Alcaldesa Guanipa destacó la importancia de construir conciencia en la población sobre la realidad que enfrenta Venezuela	\N	\N
61	/uploads/1758041228564-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__3_.webp	imagen	\N	\N	\N
62	/uploads/1758041257096-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__7_.webp	imagen	\N	\N	\N
63	/uploads/1758041275832-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__7_.webp	imagen	\N	\N	\N
64	/uploads/1758041285645-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__7_.webp	imagen	\N	\N	\N
65	/uploads/1758041652008-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__3_.webp	imagen	\N	\N	\N
66	/uploads/1758041720332-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__7_.webp	imagen	\N	\N	\N
67	/uploads/1758041895718-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__3_.webp	imagen	\N	\N	\N
68	/uploads/1758041955401-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__7_.webp	imagen	\N	\N	\N
69	/uploads/1758043384118-Comisionada_municipal_de___rea_de_Protecci__n_Social.webp	imagen	\N	\N	\N
70	/uploads/1758043393946-2d997cf9-da2a-44cb-8dbf-aa29c1dc6bab.webp	imagen	nota	\N	\N
71	/uploads/1758043540361-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__10_.webp	imagen	\N	\N	\N
72	/uploads/1758043573182-Instituciones_educativas_iniciaron_per__odo_Escolar_2025-2026_con_total___xito__5_.webp	imagen	\N	\N	\N
73	/uploads/1758043760841-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__2_.webp	imagen	\N	\N	\N
74	/uploads/1758043789775-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__5_.webp	imagen	\N	\N	\N
75	/uploads/1758043818147-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__1_.webp	imagen	Texto	\N	\N
76	/uploads/1758044362532-photo_2025-09-14_17-00-09.webp	imagen	\N	\N	\N
77	/uploads/1758044388406-photo_2025-09-14_17-00-19.webp	imagen	\N	\N	\N
78	/uploads/1758044407315-photo_2025-09-14_17-00-24.webp	imagen	\N	\N	\N
79	/uploads/1758044438430-photo_2025-09-14_17-00-19.webp	imagen	\N	\N	\N
80	/uploads/1758044447787-photo_2025-09-14_17-00-10.webp	imagen	El gobernador coordina un taller de dos días con alcaldes y administradores para promover la transparencia en la gestión pública	\N	\N
81	/uploads/1758044477147-Instituciones_educativas_iniciaron_per__odo_Escolar_2025-2026_con_total___xito__5_.webp	imagen	\N	\N	\N
82	/uploads/1758044740598-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__8_.webp	imagen	\N	\N	\N
83	/uploads/1758044783391-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__1_.webp	imagen	\N	\N	\N
84	/uploads/1758046293526-imagen_comprimida.webp	imagen	\N	\N	\N
85	/uploads/1758118816413-1003220778.webp	imagen	\N	\N	\N
86	/uploads/1758118859994-1003220790.webp	imagen	\N	\N	\N
87	/uploads/1758118946065-1003220776.webp	imagen	La jornada incluyó servicios de salud como consultas de medicina interna, medicina general, pediatría, ginecología, inmunización, discapacidad, odontología, farmacia, entre otros	\N	\N
88	/uploads/1758119805222-Nota_1_Santa_Mar__a_de_Ipire_inaugura_Juegos_Comunales_2025_con_f__tbol_comunitario__2_.webp	imagen	\N	\N	\N
89	/uploads/1758119969170-Nota_1_Santa_Mar__a_de_Ipire_inaugura_Juegos_Comunales_2025_con_f__tbol_comunitario__5_.webp	imagen	\N	\N	\N
90	/uploads/1758120077639-Nota_1_Santa_Mar__a_de_Ipire_inaugura_Juegos_Comunales_2025_con_f__tbol_comunitario__1_.webp	imagen	Los Juegos Comunales 2025 arrancan con fuerza en Santa María de Ipire, dejando claro que el deporte es mucho más que competencia	\N	\N
91	/uploads/1758120700583-Nota_2_Embellecimiento_fortalece_pertenencia_entre_atletas_y_comunidad_en_Ciudad_Ol__mpica__6_.webp	imagen	\N	\N	\N
92	/uploads/1758120754781-Nota_2_Embellecimiento_fortalece_pertenencia_entre_atletas_y_comunidad_en_Ciudad_Ol__mpica__2_.webp	imagen	\N	\N	\N
93	/uploads/1758120777542-Nota_2_Embellecimiento_fortalece_pertenencia_entre_atletas_y_comunidad_en_Ciudad_Ol__mpica__4_.webp	imagen	Desde tempranas horas, trabajadores, técnicos y voluntarios se desplegaron por los distintos espacios deportivos para realizar labores de limpieza, pintura, reparación de estructuras y acondicionamiento general	\N	\N
94	/uploads/1758121247038-Inicio_A__o_Escolar._Miranda._Gu__rico._9.webp	imagen	\N	\N	\N
95	/uploads/1758121282618-Inicio_A__o_Escolar._Miranda._Gu__rico._10.webp	imagen	\N	\N	\N
96	/uploads/1758121308533-Inicio_A__o_Escolar._Miranda._Gu__rico._1.webp	imagen	Alcaldesa del municipio de frente con la educación	\N	\N
97	/uploads/1758121774095-photo_2025-09-14_12-11-24.webp	imagen	\N	\N	\N
98	/uploads/1758121900563-photo_2025-09-14_12-11-26.webp	imagen	\N	\N	\N
99	/uploads/1758122195533-photo_2025-09-14_12-11-19.webp	imagen	La dotación, elegida mediante el voto de las propias comunidades, incluyó balones de fútbol sala y de campo, mallas, toldos y uniformes para distintas disciplinas	\N	\N
100	/uploads/1758122564605-8.webp	imagen	\N	\N	\N
101	/uploads/1758122820785-6.webp	imagen	\N	\N	\N
102	/uploads/1758122858638-1.webp	imagen	A/Ù en Salud Lcdo. Jesús Rojas junto al equipo de trabajo realiza un recorrido en el hospital	\N	\N
103	/uploads/1758123375215-photo_2025-09-16_11-58-01.webp	imagen	\N	\N	\N
104	/uploads/1758123422012-___Foto_1_Direcci__n_nacional_de_la_tolda_roja_ejecut___una_rueda_de_prensa_dando_a_conocer_que_el_pueblo_venezolano_est___en_pie_de_lucha_y_m__s_firme_que_nunca.webp	imagen	\N	\N	\N
105	/uploads/1758123728266-photo_2025-09-16_14-17-02.webp	imagen	\N	\N	\N
106	/uploads/1758123745000-photo_2025-09-16_14-16-59.webp	imagen	\N	\N	\N
107	/uploads/1758123945076-ca51bcc5-887a-4729-9f46-daddd6d17352.webp	imagen	\N	\N	\N
108	/uploads/1758124077330-cd7e00b3-9995-472b-b8ba-5193d996757c.webp	imagen	\N	\N	\N
109	/uploads/1758124369638-1.webp	imagen	\N	\N	\N
110	/uploads/1758124414508-4.webp	imagen	\N	\N	\N
\.


--
-- Data for Name: Noticia; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Noticia" (id, titulo, contenido, resumen, "autorTexto", "autorFoto", destacada, "fechaPublicacion", "createdAt", "updatedAt", "seccionId") FROM stdin;
10	Guárico continúa elevando su potencial turístico 	<p>Guárico es un destino atrayente con&nbsp; maravillosas riquezas turísticas y naturales, que representa un estado&nbsp; vigoroso con altos potenciales a nivel turístico, donde el gobernador Donald Donaire, en sus primeros 100 días de gestión, ha elevado el sector turismo significativamente sus niveles con la apertura de nuevas rutas turísticas en diversos municipios de la entidad.</p><p></p><p>En este sentido, dentro de las rutas más destacadas se encuentra la Experiencia Aguaro Guariquito ubicado en la parroquia Las Mercedes del Llano municipio Juan José Rondón; Tierra de Palma y Sol, municipio Leonardo Infante; Las Atenas del Llano, municipio Pedro Zaraza, Embalse de Tierra Blanca, El Castrero en el municipio Roscio, &nbsp;entre otros.</p><p></p><p>Asimismo Donaire acotó que a estos nuevos &nbsp;logros &nbsp;se incorpora la rehabilitación integral del antiguo Hotel Termal, ubicado en la capital guariqueña, consolidándose un hito histórico de trascendencia para la región llanera. Y a su vez, la integración de la Casa Amarilla como una casa histórica que estará abierta al pueblo para recorrer su historia.</p><img src="/uploads/1757881926198-6.-Gobernador_Donald_Donaire_comprometido_con_el_sentido_de_partencia_hist__rica_aprob___la_rehabilitaci__n_del_antiguo_hotel_termal____1_.webp"><p></p><p>Además, a esto se le suma un importante centro turístico como lo es el Hotel &amp; Spa Aguas Termales de San Juan de los Morros, conteniendo una importante capacidad hotelera para propios y visitantes.</p><p></p><p>Es por ello que el Gobierno Bolivariano en Guárico, de la mano con el presidente Nicolás Maduro y con el Ministerio del Poder Popular Para el Turismo, en Guárico con el gobernador Donald Donaire &nbsp;y con la autoridad única de Turismo en la región Norelys Andara, se sigue trabajando en pro de generar espacios dignos para el sano esparcimiento.</p>	Guárico es un destino atrayente con  maravillosas riquezas turísticas y naturales, que representa un estado  vigoroso con altos potenciales a nivel turístico, donde el gobernador Donald Donaire, en sus primeros 100 días de gestión, ha elevado el sector turismo significativamente sus niveles con la a	Luisana Villarroel 	Archivo Sibci 	f	2025-09-14 20:32:56.324	2025-09-14 20:32:56.324	2025-09-14 20:32:56.324	8
2	Más territorio, menos escritorio: Así se fortalece el Poder Popular en Guárico con el gobernador Donaire	<p>En el marco de los primeros 100 días de gestión del Gobernador del estado Guárico, Donald Donaire, se han llevado a cabo diversas acciones en el área de comunas, con el objetivo de seguir construyendo soluciones desde el territorio y fortalecer el crecimiento y trabajo mancomunado entre los comuneros y comuneras en los 261 circuitos comunales en el estado Guárico.</p><p>En este sentido, se destacan acciones comola entrega de "Trabucos Clap", entrega de semillas lo cual representa un avance significativo hacia la soberanía alimentaria yrehabilitación de calles que facilitan la ejecución de proyectos derivados de la consulta popular nacional, dando espacio a la formación en el área de comunas lo ha sido un pilar fundamental en esta gestión, con iniciativas como "La Comuna es Joven", la Consulta Popular del Proyecto Juvenil, y la formación para formadores, organizada por Encomuna, el Ministerio de las Comunas y Fundacomunal, ha sido esencial para impulsar las 7 Transformaciones propuestas por el Presidente Nicolás Maduro.</p><img src="/uploads/1757878642267-1.-Gobernador_Donald_Donaire_fortalece_lazos_con_el_Poder_Popular_Hurac__n_comunero__3_.webp"><p>Del mismo modo, más de 300 trabajadores del Huracán Comunero han recibido atención médica en 8 áreas, junto con la entrega de medicamentos gratuitos. También se ha beneficiado a parceleros con la instalación de paneles solares, promoviendo así el acceso a energías sostenibles en la región.</p><p>Asimismo, se han llevado a cabo encuentros entre funcionarios de la Policía Estadal del Cuadrante de Paz, voceros comunales, jefes de comunidad y representantes de la Sala de Autogobierno, abordando temas relacionados con la convivencia pacífica y la prevención ciudadana. Con el lema "Más Territorio, Menos Escritorios", se han ejecutado juegos deportivos comunales y se han establecido Salas de Autogobierno Comunal. La Universidad Nacional de las Comunas (Unacom) ha impulsado programas de formación para docentes comunitarios, articulando esfuerzos que impactan directamente en el bienestar del pueblo guariqueño. Recientemente, se realizó un taller sobre Organizaciones Socioproductivas (O.S.P) en el Circuito Vencedores de Guárico, ubicado San Juan de los Morros.</p><p>Es importante mencionar que, la gestión del Gobernador Donald Donaire sigue avanzando con fuerza y compromiso hacia un Guárico más próspero y solidario con el desarrollo integral de las comunidades impulsando las vocerías comunitarias, promotores y líderes locales ratificando el impulso de iniciativas productivas desde lo territorial para consolidar el poder popular y garantizar una gestión comunal más organizada y efectiva.</p>	En el marco de los primeros 100 días de gestión del Gobernador del estado Guárico, Donald Donaire, se han llevado a cabo diversas acciones en el área de comunas, con el objetivo de seguir construyendo soluciones desde el territorio y fortalecer el crecimiento y trabajo mancomunado entre los comunero	Sandy Carvajal 	PCP	f	2025-09-14 19:39:25.472	2025-09-14 19:39:25.472	2025-09-14 20:09:14.951	1
8	Más vehículos, más desarrollo: 100 días del gobernador de Guárico que impulsa el progreso en la región 	<p>En el marco de los primeros 100 días de gestión del gobernador Donald Donaire, el gobierno regional ha intensificado sus esfuerzos para mejorar la calidad de vida de los habitantes del estado Guárico. Desde su toma de posesión, Donaire ha liderado una gestión caracterizada por el trabajo constante y progresivo, enfocándose en el desarrollo de la infraestructura y el bienestar de la comunidad guariqueña con iniciativas como la reactivación del parque automotor en el Complejo Agroindustrial Pedro Camejo.</p><p>&nbsp;</p><p>En este sentido, este parque&nbsp; automotor&nbsp; ubicado en Calabozo, municipio Miranda. Gracias a un esfuerzo conjunto, se han recuperado camiones modelo volteos que se encontraban inoperativos. Este proceso integral incluyó el cambio de motores, cauchos, aceite y luces, lo que ha permitido que estos vehículos cuenten ahora con total operatividad.</p><p>&nbsp;</p><p>&nbsp;Esta acción no solo mejora la eficiencia en las labores del municipio, sino que también representa un claro compromiso del Gobierno Bolivariano por fortalecer la infraestructura y asegurar un futuro más próspero para todos los ciudadanos guariqueños.</p><img src="/uploads/1757880912934-Veh__culos_rehabilitados_en_el_parque_automotor_en_el_Complejo_Agroindustrial_Pedro_Camejo__2_.webp"><p>Del mismo modo, el gobernador Donald Donaire ha enfatizado la importancia de estas acciones, manifestando que el pueblo merece el esfuerzo, y se está trabajando con la voluntad de hacer las cosas bien. Este enfoque ha guiado la priorización en la recuperación de la maquinaria amarilla en la región, vehículos para las instituciones de salud, la Corporación Eléctrica Nacional (Corpoelec) y obras públicas, siguiendo las instrucciones del presidente Nicolás Maduro.</p><p>&nbsp;</p><p>En el ámbito agrícola, se han realizado avances significativos con la recuperación de tractores los cuales ya están en funcionamiento y en su debido uso. Asimismo, entre estos avances se destaca la incorporación de los motores modelo D6T, así como los cauchos necesarios para garantizar su operatividad dando así una mayor vida útil a estos vehículos que se requerían una rehabilitación totalmente completa en su área automotora.</p><p>&nbsp;</p><p>Por su parte el mandatario regional, ha enfocado esfuerzos en la mejora del servicio de transporte en el estado Guárico, destacando la labor de la Secretaría de Transporte. Entre las acciones implementadas, se han llevado a cabo reuniones con transportistas locales para escuchar sus necesidades y proponer soluciones efectivas. Además encomendó inspeccionar todas las unidades de Bus Guárico que se encuentran inoperativas.</p><p>&nbsp;</p><p>Es importante mencionar que, a pesar de los desafíos, el gobernador Donald Donaire continúa trabajando y avanzando hacia el bienestar de los habitantes de la región llanera, brindando oportunidades y beneficios a cada rincón del estado. La gestión del gobernador Donaire es un testimonio del esfuerzo constante por mejorar la calidad de vida de los guariqueños.</p>	Desde su toma de posesión, Donaire ha liderado una gestión caracterizada por el trabajo constante y progresivo, enfocándose en el desarrollo de la infraestructura y el bienestar de la comunidad guariqueña con iniciativas como la reactivación del parque automotor en el Complejo Agroindustrial Pedro Camejo.	Sandy Carvajal 	Archivo Sibci 	f	2025-09-14 20:16:11.216	2025-09-14 20:16:11.216	2025-09-14 20:17:17.686	1
9	De la promesa a la acción: Los resultados de los primeros 100 días de gestión hídrica en Guárico	<p>En sus primeros 100 días de gestión, el gobernador Donald Donaire ha impulsado una agenda transformadora en el estado Guárico, mejorando cada uno de los sectores importantes que conforman su gestión, con un énfasis en el área de servicios públicos. Específicamente en el suministro de agua potable, el ejecutivo regional, a través del ingeniero Hecduar López, secretario de Servicios Públicos, ha ejecutado importantes obras que ya benefician a miles de familias guariqueñas.</p><p>&nbsp;</p><p>‎La visión del gobernador Donaire, centrada en el bienestar del pueblo, se ha materializado en acciones concretas que garantizan un acceso más eficiente y de calidad al vital líquido. Los trabajos realizados, en articulación con la Dirección de Hidráulica y el personal de Hidropáez, han logrado la reactivación y optimización de acueductos en diferentes municipios.</p><p>‎</p><p>‎Obras destacadas en el suministro de agua y electrificación:</p><p>‎</p><p>‎Asimismo, desde el municipio San Jerónimo de Guayabal, en el sector Cazorla, se instaló una bomba y un motor sumergible de 20 HP, dejando el acueducto totalmente operativo y asegurando el suministro a la comunidad.</p><p>&nbsp;</p><p>‎Por consiguiente, el municipio Juan Germán Roscio Nieves, específicamente, en la capital de San Juan de los Morros, se realizó la limpieza y aforo del pozo profundo ubicado en el Centro de Reclusión para procesados judiciales “26 de Julio”, mejorando significativamente el servicio de agua en este importante centro. Asimismo, en el Pozo Nº 1, se instaló un equipo sumergible de 15 HP con su empalme de resina, 60 metros de cable sumergible y un tablero de protección y control, beneficiando a más de 60 sectores a lo largo de la Avenida José Félix Ribas.</p><p>&nbsp;</p><p>‎Así, desde el sector La Ceiba, del municipio Ortiz, se realizaron importantes trabajos que incluyeron la colocación de acometida eléctrica, un térmico, la instalación y prueba de una bomba centrífuga de 40 HP con arranque directo, para luego continuar con la limpieza de la galería filtrante, garantizando el suministro de agua potable en óptimas condiciones.</p><p>&nbsp;</p><p>‎Además, para el sector La Caimana, se sustituyó un equipo sumergible de 5.5 HP trifásico, dejando el acueducto totalmente operativo. &nbsp;Por último, el sector Guaitoco recibió la activación del acueducto tras reparar una falla en el conductor y el contactor del tablero, beneficiando directamente a 250 familias. Siguiendo el mismo orden de ideas, el Municipio José Tadeo Monagas, en especial desde Altagracia de Orituco, el sector Turmerino se benefició con la reparación de un tablero que aseguró el buen funcionamiento de un motor de 10 HP trifásico, dejando el acueducto completamente operativo.</p><p>&nbsp;</p><p>‎De igual manera, en el sector Samanito, se realizó la limpieza y aforo del pozo, y se instaló un equipo sumergible de 7.5 HP, dejando el acueducto totalmente operativo.</p><p>‎Es así como, desde el municipio Chaguaramas, en su sector La Morrocoya, se instaló un equipo sumergible de 3 HP monofásico con su caja de arrancadora y empalme de resina, dejando el acueducto completamente operativo y beneficiando a 90 familias.</p><p>‎El gobernador Donald Donaire y su equipo de gestión demuestran con estas acciones que su compromiso por el bienestar de Guárico es una prioridad ineludible. Continuará con esta gran gestión que le regala al pueblo bienestar, buenas nuevas y consolida a la región como tierra de prosperidad y avances.</p><p>‎</p>	En el suministro de agua potable, el Ejecutivo Regional, liderado por Donald Donaire de la amano del ingeniero Hecduar López, secretario de Servicios Públicos, ha ejecutado importantes obras que ya benefician a miles de familias guariqueñas.	Saray Sumoza	Archivo Sibci 	f	2025-09-14 20:21:00.975	2025-09-14 20:21:00.975	2025-09-14 20:21:00.975	1
11	Guárico se consolida como epicentro deportivo con la Segunda Válida Nacional de Escalada 	<p>En un ambiente cargado de energía, disciplina y pasión, inició en el majestuoso Muro de Escalada de la Ciudad Olímpica de San Juan de los Morros la Segunda Válida Nacional de Escalada Deportiva en la modalidad Bloque, evento que reúne a los mejores atletas del país y que ratifica el compromiso del Gobierno Bolivariano del presidente Nicolás Maduro y del gobernador del estado Guárico, Donald Donaire, con el impulso del deporte en todas sus disciplinas.</p><p>En esta justa nacional participan delegaciones de Miranda, Caracas, Carabobo, Aragua, Mérida, Trujillo y Guárico, compitiendo en las categorías: Sub 15, Sub 16, Sub 17, Sub 18, Sub 19, Sub 20, Sub 21, Senior (21+ años) y Open (15+ años), lo que convierte a este evento en una plataforma para el desarrollo del talento juvenil y de alto rendimiento.</p><p>En este sentido, Yosbany González, director de Alto Rendimiento, expresó su satisfacción por el desarrollo de la válida y agradeció al Ejecutivo regional por el respaldo “Nos encontramos en nuestra bella Ciudad Olímpica, donde se lleva a cabo la segunda válida nacional en la modalidad bloque. Agradecemos profundamente a nuestro gobernador Donald Donaire por todo el apoyo brindado a nuestros atletas y a la delegación guariqueña para hacer posible esta actividad”, afirmó.</p><p>A su vez, el guariqueño Gianstefano Di Nino manifestó el orgullo de representar a su estado “Estamos los mejores escaladores del país, ya hemos culminado la ronda clasificatoria y seguimos demostrando la fuerza del talento guariqueño”.</p><p>Por su parte, María Santaella destacó el esfuerzo de su equipo en la preparación previa “Estoy muy feliz de participar en esta segunda válida nacional. Venimos trabajando con mucha disposición y disciplina, y hoy queremos mostrar los frutos de ese esfuerzo”.</p><p>Asimismo, la atleta Patricia Laya resaltó el respaldo institucional que ha hecho posible la actividad “Quiero agradecer a la Gobernación del estado Guárico, al Instituto del Deporte y a la Federación Venezolana de Escalada. Me siento muy orgullosa de competir en este evento y vengo con la mejor disposición de lograr todos mis objetivos”.</p><p>De esta manera, el gobernador Donald Donaire, reafirma su compromiso con la capital deportiva del centro del país, al albergar competencias de talla nacional que fortalecen el semillero de atletas y promueven valores como la disciplina, la constancia y la excelencia. Todo ello bajo la orientación del presidente Nicolás Maduro con el objetivo de continuar garantizando espacios dignos y de calidad para el desarrollo integral de la juventud venezolana.</p>	Inició en el majestuoso Muro de Escalada de la Ciudad Olímpica de San Juan de los Morros la Segunda Válida Nacional de Escalada Deportiva en la modalidad Bloque.	Esmeralda Jiménez 	Archivo Sibci 	f	2025-09-14 20:37:42.984	2025-09-14 20:37:42.984	2025-09-14 20:37:42.984	3
5	Guárico marcó un hito productivo en los primeros 100 días de gestión del gobernador Donald Donaire 	<p>En el marco de los primeros 100 días de gobierno, del gobernador del estado Guárico, Donald Donaire, se lograron grandes avances en&nbsp; el desarrollo agroeconómico da la entidad llanera, esto dando cumplimiento a la primera T de las 7 transformaciones que instruyó el presidente de la república, Nicolás Maduro, que va consonó con el nuevo modelo económico, que permite a las comunas y consejos comunales el desarrollo agrícola y pecuario.</p><p>En este sentido, es importante resaltar, que el gobernador de la entidad, Donald Donaire, marcó un hito en estos primeros 100 días en cuento a lo productivo, mediante una iniciativa que propuso&nbsp; en campaña y tiene que ver con la siembra de un banco de semilla, fueron más de 307 hectáreas divididas en 240 hectáreas de maíz blanco variedad Turen y 67 de maíz amarillo variedad Guanape, esto permitirá la siembra de 40.000 hectáreas para el próximo ciclo; asimismo, se sembraron de 20 hectáreas de arroz que también permitirá la siembra de mayor hectáreas y ayudará a la producción de las comunas y los circuitos comunales, por primera en la historia, en un estado tan&nbsp; productivo como Guárico se toma la iniciativa de proveer las herramientas necesarias para el apalancamiento productivo, con semilla propia.</p><img src="/uploads/1757879047735-TOMAS_AEREAS__1_.webp"><p>Por otro lado, se impulsó la recuperación de un cebadero de ganado bovino que podría albergar más de 3.000 animales, para ello se sembró sorgo forrajero para garantizarle la alimentación adecuada a los animales, esto en al marco de la recuperación del área ganadera de la empresa socialista de Riego Río Tiznados.</p><p>Igualmente, fueron más de 250,000 mil alevines de la especie Coporo los que sembraron en las diferentes lagunas y embalses en todo el estado Guárico, luego de ser cultivados en las 9 lagunas artificiales en la empresa socialista de Riego Río Tiznados, esta producción de carne de pescados, es distribuida en los circuitos comunales a nivel local y regional, mientras que a nivel nacional Guárico es indicativo de garantía de producción de proteína animal, el mismo orden de ideas pero en diferente rubro, se pudo observar que, en casas de cultivo, donde destacan rubros como el pimentón, la cebolla, además de proteína natural, como frijoles, caraotas y más, se llegó a producir lo que representa el 10% de aporte al consumo per cápita regional solo en pimentón.</p><img src="/uploads/1757879129408-photo_7_2025-09-12_11-16-54.webp"><p>Siendo así, esto produce empleos directos e indirectos, que de una u otro forma benefician a la familia guariqueña, finalmente, en todo lo que tiene que ser con el parqué auto motor del sector productivo, hubo un avance en recuperación de camiones, tractores, entre otros, si esto solo fue en 100 días, muy seguramente, la secretaria económica, junto al ministerio de agricultura, concretarán lo que para Guárico será un milagro productivo.</p>	En el marco de los primeros 100 días de gobierno, del gobernador del estado Guárico, Donald Donaire, se lograron grandes avances en  el desarrollo agroeconómico da la entidad llanera, esto dando cumplimiento a la primera T de las 7 transformaciones que instruyó el presidente de la república, Nicolás	Wilmer Matos 	Archivo Sibci 	f	2025-09-14 19:46:10.124	2025-09-14 19:46:10.124	2025-09-16 15:55:42.396	5
7	Iluminando Guárico: Donald Donaire acelera la transformación eléctrica en sus primeros 100 días de gestión 	<p>En marco de los primeros 100 días de gestión del gobernador Donald Donaire, el estado Guárico ha experimentado una notable transformación en el sector eléctrico. Las acciones, enmarcadas en la 2da Transformación (Ciudades más Humanas) del Plan de las 7T, han llevado luz y eficiencia a diversas comunidades y avenidas principales, impactando positivamente la calidad de vida de sus habitantes.</p><p>&nbsp;</p><p>‎El epicentro de esta revitalización ha sido el Plan de Electrificación de San Juan de los Morros. Este ambicioso proyecto, liderado por el gobernador Donaire, ha mejorado sustancialmente el servicio eléctrico en arterias viales primordiales de la capital, como las avenidas Los Llanos, Lazo Martí, Fermín Toro y Rómulo Gallegos, que ahora lucen completamente renovadas y con un alumbrado público eficiente, brindando mayor seguridad y bienestar a los sanjuaneros.</p><p></p><img src="/uploads/1757880301078-photo_2025-09-12_10-43-31.webp"><p></p><p>De esta manera, la gestión del gobernador también se ha enfocado en fortalecer la infraestructura eléctrica en otras localidades. En las parroquias Tucupido y San Rafael de Laya, se ha dispuesto la instalación de un transformador de 25 KVA y 100 luminarias, mejorando el suministro y la calidad del servicio para estas importantes comunidades del estado.</p><p>&nbsp;</p><p>‎Un ejemplo tangible de la atención directa a las necesidades del pueblo es la inspección realizada por el gobernador Donald Donaire, junto al alcalde del municipio Ribas, Daniel Charaima, en el sector El Tranquero, de la parroquia Tucupido. Allí, supervisaron la instalación de un transformador destinado a beneficiar directamente a esta comunidad, demostrando la eficacia y respuesta inmediata del Sistema 1x10 del Buen Gobierno.</p><p>&nbsp;</p><p>‎Además, el compromiso del gobernador Donaire con todo el estado Guárico se evidencia con el envío de dos camiones cargados con transformadores, destinados a fortalecer y beneficiar a diversas localidades como Valle de la Pascua, Parapara, Ortiz, El Rastro, Calabozo, Camaguán y Las Mercedes, entre otras, recibiendo estos recursos esenciales para sus sistemas de iluminación y electrificación.</p><p>&nbsp;</p><p>‎Como parte de este esfuerzo integral para la modernización de los servicios, la avenida Luis Aparicio, en San Juan de los Morros, también fue objeto de una significativa rehabilitación en su sistema de iluminación. Esta acción se suma a las mejoras realizadas en otras arterias viales, consolidando una capital más iluminada y segura.</p><p>&nbsp;</p><p>‎Con estas acciones contundentes en sus primeros 100 días, el gobernador Donald Donaire reafirma su inquebrantable compromiso con el pueblo guariqueño. "Esto se hace por amor a Guárico", ha expresado el mandatario, asegurando que continuará trabajando sin descanso por el bienestar de todo el estado, llevando progreso y un futuro más brillante a cada rincón de la región llanera.</p>	En marco de los primeros 100 días de gestión del gobernador Donald Donaire, el estado Guárico ha experimentado una notable transformación en el sector eléctrico. Las acciones, enmarcadas en la 2da Transformación (Ciudades más Humanas) del Plan de las 7T, han llevado luz y eficiencia a diversas comun	Saray Sumoza	Archivo Sibci 	f	2025-09-14 20:09:14.954	2025-09-14 20:09:14.954	2025-09-17 15:37:42.743	1
14	Guárico arranca con éxito el nuevo periodo académico 2025-2026	<p>San Juan de los Morros.- Con alegría y optimismo, miles de estudiantes en todo el estado Guárico regresaron a sus aulas, marcando un exitoso inicio del año escolar 2025-2026. La jornada transcurrió con normalidad y entusiasmo, reflejando el arduo trabajo y la planificación del gobierno regional para garantizar un retorno a clases en las mejores condiciones.</p><p>‎</p><img src="/uploads/1758037975687-Altagracia_de_Orituco__1_.webp"><p>El compromiso del mandatario regional, Donald Donaire, ha sido un pilar fundamental en la construcción de la buena educación para cada niño y niña del estado Guárico.</p><p>‎De esta forma, el líder guariqueño aseguró que todos los estudiantes guariqueños merecen las mismas oportunidades de recibir una educación de calidad, y que continuará trabajando a través de su gestión para hacer de la educación guariqueña la más completa y fructífera en cada niño.</p><img src="/uploads/1758038004500-Chaguaramas__2_.webp"><p>‎Así, el gobernador se dirigió a toda la comunidad estudiantil y docente del estado: "con el corazón lleno de alegría, felicito a nuestros niños, niñas y jóvenes que hoy retoman el camino del saber. Que este nuevo año escolar sea un período de grandes aprendizajes, de crecimiento personal y de sueños cumplidos. Cuenten con nuestro firme compromiso de seguir trabajando incansablemente por su bienestar y por forjarles un futuro brillante. Que la bendición de Dios ilumine sus mentes y guíe sus pasos en cada jornada. ¡El futuro de Guárico está en sus manos!"</p><p></p><p>‎El exitoso inicio de clases en Guárico no solo representa el cumplimiento del calendario académico, sino también la materialización de una gestión comprometida con la educación como herramienta primordial para el progreso y el desarrollo del estado.</p>	Con alegría y optimismo, miles de estudiantes en todo el estado Guárico regresaron a sus aulas, marcando un exitoso inicio del año escolar 2025-2026	‎Saray Sumoza ECS-Unerg 	Sibci - Guárico 	f	2025-09-16 15:55:42.4	2025-09-16 15:55:42.4	2025-09-17 15:42:42.914	9
6	Sector Cultura en Guárico entró con hechos en los primeros 100 días de gestión del gobernador Donaire	<p>“Sin cultura no somos nada”, fueron palabras expresadas por el gobernador, del estado Guárico, Donald Donaire, cuando decidió darle cabida en su gestión de gobierno a los cultores de la entidad llanera, con el objetivo de profundizar mediante la cultura el sentido de pertenencia, por lo cual, durante sus&nbsp; primeros 100 días de gobierno ha implementado diversos trabajos que le han permitido a los representantes de la cultura por primera sentirse tomados en cuenta, recordando que la cultura es la memoria del pueblo, la conciencia colectiva de la continuidad histórica y la forma de pensar y vivir de muchos.</p><p>&nbsp;</p><p>De esta forma, el líder social, gobernador Donald Donaire, invitó a los cultores de diferentes municipios del estado a la conformación de mesas de trabajo, que tuvieron como meta crear el Estado Mayor de Cultura, este encuentro se llevó a cabo en las instalaciones de lo que para ese momento era la residencia oficial del gobernador, hoy, la Casa del Pueblo, una decisión que tomó, que también salta a lo turístico, puesto que la Casa Amarilla es un atractivo histórico que visitantes también podrán disfrutar,&nbsp; así se propuso la creación de una ley que sustenta esta decisión.</p><img src="/uploads/1757879513527-2.-Mesas_de_trabajo_en_los_distintos_municipios_fueran_conformadas___1_.webp"><p></p><p>Asimismo, no solo se conformaron mesas de trabajos y se dio acceso total a la cultura y al pueblo a la Casa Amarilla, sino que además, se aprobó la recuperación de la Casa de la Cultura Dr. Víctor Manuel Ovalles, en San Juan de los Morros, capital del estado Guárico. &nbsp;Una casa cultural habitada por niños y niñas, jóvenes y adultos y que nunca antes fue considerada o tomada en cuanta, lo que causó gran contento en la población y definió el rumbo del sector cultura, estas acciones también fueron llevadas a los 15 municipios de la entidad, ya que cada representante se fue a cada territorio a escuchar al pueblo cultor.</p>	“Sin cultura no somos nada”, fueron palabras expresadas por el gobernador, del estado Guárico, Donald Donaire, cuando decidió darle cabida en su gestión de gobierno a los cultores de la entidad llanera, con el objetivo de profundizar mediante la cultura el sentido de pertenencia.	Wilmer Matos 	Archivo Sibci 	f	2025-09-14 19:53:19.52	2025-09-14 19:53:19.52	2025-09-16 16:05:23.027	4
16	Capital guariqueña fue sede del torneo juvenil de voleibol playa	<p>San Juan de los Morros.- Desde la Ciudad Olímpica, se llevó a cabo el Invitacional de Voleibol de Playa para la selección del Campeonato Nacional Federado U-18, donde reunió a jóvenes promesas del voleibol venezolano en un evento que dejó huella en la capital guariqueña. Bajo un sol inclemente y sobre la arena ardiente, los atletas demostraron que el deporte sigue siendo una fuerza que une y transforma.</p><p>&nbsp;</p><img src="/uploads/1758039214272-Nota_2_Capital_guarique__a_fue_sede_del_torneo_juvenil_de_voleibol_playa__2_.webp"><p>La competencia contó con la participación de 13 duplas en total, ocho femeninas y cinco masculinas, provenientes de distintos clubes del país, cada encuentro fue una muestra de disciplina, técnica y pasión por el voleibol de playa, modalidad que ha ganado terreno en el panorama deportivo nacional.</p><p>&nbsp;Más allá de los resultados, el Invitacional dejó claro que el voleibol de playa juvenil tiene futuro en Venezuela, los jugadores demostraron un nivel técnico sorprendente, producto del trabajo constante en sus clubes y del compromiso con su formación deportiva.</p><img src="/uploads/1758039279805-Nota_2_Capital_guarique__a_fue_sede_del_torneo_juvenil_de_voleibol_playa__6_.webp"><p>Más allá de los resultados, el Invitacional dejó claro que el voleibol de playa juvenil tiene futuro en Venezuela, los jugadores demostraron un nivel técnico sorprendente, producto del trabajo constante en sus clubes y del compromiso con su formación deportiva. La selección final será anunciada en los próximos días, y se espera que represente con orgullo al estado en el campeonato nacional.</p><p>&nbsp;</p><p>San Juan de los Morros se despidió del Invitacional con la satisfacción de haber sido epicentro de una experiencia deportiva enriquecedora. El voleibol de playa sigue creciendo, y eventos como este son prueba de que, con esfuerzo y pasión, los sueños de los atletas juveniles pueden convertirse en realidad.</p>	Más allá de los resultados, el Invitacional dejó claro que el voleibol de playa juvenil tiene futuro en Venezuela, los jugadores demostraron un nivel técnico sorprendente, producto del trabajo constante en sus clubes y del compromiso con su formación deportiva.	Hector Ortiz (ECS-Unerg)	Sibci - Guárico 	f	2025-09-16 16:14:58.108	2025-09-16 16:14:58.108	2025-09-16 16:14:58.108	3
17	Celebran el 69º aniversario de fundación de la Parroquia Eclesiástica de San José de Guaribe 	<p>Con el 69 Aniversario de Fundación canónica, La Parroquia Eclesiástica San José,&nbsp; ha conmemorando una rica historia de fe, servicio y crecimiento comunitario. Fundada un 14 de septiembre de 1956, la parroquia se ha convertido en un pilar espiritual y social para los habitantes del municipio.</p><img src="/uploads/1758040121379-1002814207.webp"><p>La historia de la parroquia comenzó bajo el mandato del Obispo de Calabozo, Mons. Antonio Ignacio Camargo, quien envió al Presbítero Martín Persa para iniciar la labor pastoral en el pueblo. El padre Persa estableció la primera capilla provisional, marcando el nacimiento de la vida parroquial. Años después, el 23 de marzo de 1957, se inició la construcción del primer templo, que con el tiempo dio paso en varias remodelaciones, a la actual iglesia, inaugurada el 17 de septiembre de 1988.</p><img src="/uploads/1758040218720-1002816493.webp"><p>A lo largo de sus 69 años, la parroquia ha sido guiada por 20 sacerdotes, entre los que destacan sus fundadores y pastores que han dejado una huella imborrable.</p><p></p><p>Actualmente, la Parroquia de San José de Guaribe cuenta con una excelente organización pastoral, incluyendo el Consejo Parroquial de Pastoral y diversos movimientos de apostolado como la Legión de María, la Pastoral Juvenil, los Cursillos de Cristiandad, Catequesis, Pastoral Social, Coros de Animación, entre otros. Estos grupos, conformados por feligreses comprometidos, reflejan el dinamismo de la fe en la comunidad.</p><p></p>	Las celebraciones por el aniversario han incluido un programa especial durante la "Semana Jubilar Parroquial", que ha contado con la colaboración de instituciones, movimientos de apostolado y el pueblo de San José de Guaribe	Msc Soraya González Rojas Vocera del Estado Mayor de Cultura del estado Guárico	Cortesía 	f	2025-09-16 16:30:42.066	2025-09-16 16:30:42.066	2025-09-16 16:30:42.066	2
18	‎Guárico avanza con la Fiesta Nacional de Inmunizaciones en sincronía con el resto del país	<p>Dando cumplimiento a las líneas estratégicas emanadas por el Ministerio del Poder Popular para la Salud (MPPS), las cuales han sido creadas desde las bases sociales de los planes de las 7 transformaciones, se inició en todo el país, la “Fiesta Nacional de Inmunizaciones”, actividad que tiene como propósito promover la vacunación, para proteger a las personas de todas las edades frente a enfermedades prevenibles por vacunas.</p><p>‎Esta estrategia, que se está llevando a cabo todos los segundos sábados o domingos de cada mes, la están efectuando los equipos básicos de las&nbsp;19 Áreas de Salud Integral Comunitarias (ASIC), en la región llanera, aplicando las dosis correspondientes de las distintas vacunas y brindan orientación con sesiones educativas a la población, sobre la importancia de estar al día con el esquema de vacunación.</p><img src="/uploads/1758040642562-5.webp"><p>‎"En el estado Guárico, el despliegue se está realizando en las comunidades de los 15 municipios de esta entidad, esto con la finalidad de lograr un mejor abordaje, especialmente en aquellas zonas cuyo acceso es difícil" así lo dió a conocer, la coordinadora regional&nbsp; del Programa Ampliado de Inmunizaciones (PAI), Lcda. Claret del Nogal, quien además acotó que se está llevando a cabo también el “Plan Luciérnaga”, el cual se caracteriza por visitas domiciliarias, en horarios nocturnos, para facilitar que la población pueda acceder a la vacunación de forma más cómoda.</p><p>‎Gracias al presidente de la República Bolivariana de Venezuela; Nicolás Maduro Moros y a la ministra del MPPS; Magaly Gutiérrez Viña, se continúa elevando la calidad de vida del pueblo, promoviendo esta iniciativa que busca erradicar más de 30 enfermedades transmisibles.</p>	‎Gracias al presidente de la República Bolivariana de Venezuela; Nicolás Maduro Moros y a la ministra del MPPS; Magaly Gutiérrez Viña, se continúa elevando la calidad de vida del pueblo, promoviendo esta iniciativa que busca erradicar más de 30 enfermedades transmisibles.	Vanessa Méndez 	Cortesía	f	2025-09-16 16:37:56.649	2025-09-16 16:37:56.649	2025-09-16 16:37:56.649	10
19	Alcaldesa Katherine Guanipa y líderes del PSUV abordan la defensa de la soberanía venezolana en asamblea comunitaria 	<p><strong>San Juan de los Morros.–</strong> La alcaldesa Katherine Guanipa, junto a líderes del Partido Socialista Unido de Venezuela (PSUV), llevó a cabo un importante debate en la comunidad de Pedro Zaraza, en el marco de las orientaciones del presidente Nicolás Maduro y del primer vicepresidente del Partido Socialista Unido de Venezuela (PSUV), Diosdado Cabello. Este encuentro reunió a militantes del partido y a vecinos y vecinas comprometidos con la defensa de la soberanía nacional frente al a las agresiones norteamericanas.</p><p></p><p>En este sentido, durante la asamblea, la alcaldesa Katherine Guanipa destacó la importancia de construir conciencia en la población sobre la realidad que enfrenta Venezuela. “Las armas ni las bombas tienen nombres y apellidos, pero están agrediendo a nuestro país. Por eso, nos estamos preparando para pasar de una lucha ideológica con conciencia revolucionaria a una lucha armada en defensa de nuestra soberanía e independencia”, afirmó.</p><p>Asimismo, David Rodríguez, delegado territorial al cuarto congreso de la juventud del Partido Socialista Unido de Venezuela (PSUV), enfatizó que el encuentro es parte de un esfuerzo más amplio para activar el Plan Independencia 200. “Hemos tomamos los cuarteles y las comunidades de todo el país para debatir ideas y prepararnos ante cualquier eventualidad. Estamos listos para defender nuestra patria”, expresó Rodríguez.</p><p>Por su parte, Marcia Pérez, subrayó que la amenaza contra la nación no es nueva. “Desde el inicio de la revolución hemos estado bajo ataque. Sin embargo, como poder popular establecido en nuestra Constitución, estamos asumiendo un papel protagónico en esta nueva etapa de democracia participativa. El presidente ha hecho un llamado y nosotros hemos respondido activando las fases de alistamiento, adiestramiento y debate”.</p><p>Es importante mencionar que, este encuentro reafirma el compromiso del Partido Socialista Unido de Venezuela (PSUV) y del poder popular en la defensa de la soberanía nacional, así como la disposición de sus líderes y militantes para enfrentar cualquier desafío que ponga en riesgo la independencia de Venezuela.</p>	Este encuentro reunió a militantes del partido y a vecinos y vecinas comprometidos con la defensa de la soberanía nacional frente al a las agresiones norteamericanas	Sandy Carvajal (ECS Unerg)	Yoander Coronel	f	2025-09-16 16:47:03.442	2025-09-16 16:47:03.442	2025-09-16 16:47:03.442	2
24	Con amor y alegría niños y niñas de Guayabal iniciaron actividades escolares periodo 2025-2026	<p>Desde&nbsp; las inmediaciones&nbsp; de la Escuela Primaria Bolivariana, Ana Felicinda&nbsp; Loreto en la parroquia Guayabal, se dio inicio al año escolar 2025- 2026, atendiendo el llamado del presidente Nicolás Maduro, del gobernador Donald Donaire y del ministro de Educación Héctor&nbsp; Rodríguez.</p><p>Pinta caritas, actividades culturales, entrega de regalos, refrigerios, y muchas sorpresas más, fueron parte de las actividades organizadas por el personal del Centro de Desarrollo de la Calidad Educativa municipal (CDCE). Esta actividad con todo con la presencia de la máxima autoridad local, la Alcaldesa Nairoby Garcia, quien resaltó&nbsp; que con mucha alegría y&nbsp; diversión, las instituciones educativas del municipio iniciaron sus actividades escolares, "hoy vemos la presencia de estudiantes en más de 11 instituciones, ya que debido a la contingencia en algunos centros educativos no se podrá dar inicio de actividades escolares el día de hoy, pero estas se estarán dando de manera progresiva, es importante mencionar la fusión perfecta entre el pueblo y la fuerza armada nacional bolivariana en la atención y en el acompañamiento con responsabilidad atendiendo en estos espacios". Afirmó.</p><img src="/uploads/1758041895718-Con_amor_y_alegr__a_ni__os_y_ni__as_de_Guayabal_iniciaron_actividades_escolares_periodo_2025-2026__3_.webp"><p>Por su parte, el Profesor Euclides Mirabal, Director del CDCE, indicó que en la entidad existen un total de 97 instituciones educativas de las cuales sólo 11 están iniciando el periodo escolar debido a la condición de algunas instituciones, pero que alrededor de 850 niños y niñas, hoy se han abocado al inicio del año escolar.</p><p>"Nosotros pues con mucho optimismo en fusión perfecta, gracias al ministro Héctor Rodríguez, a nuestro presidente Nicolás Maduro y a la autoridad única de educación en el Estado Guárico Elías Zurita, estamos iniciando este periodo escolar".</p>	Pinta caritas, actividades culturales, entrega de regalos, refrigerios, y muchas sorpresas más, fueron parte de las actividades organizadas por el personal del Centro de Desarrollo de la Calidad Educativa municipal (CDCE).	Luisana Figueroa	Cortesía	f	2025-09-16 16:59:15.949	2025-09-16 16:59:15.949	2025-09-16 16:59:15.949	9
27	Gobernador Donald Donaire fortalece la gestión y defensa del estado 	<p>El Gobernador Donald Donaire ha llevado a cabo una intensa y variada agenda de trabajo enfocada en la formación, organización y defensa del estado Guárico, a través de diversas actividades, el gobernador ha mostrado su compromiso con el desarrollo regional y la unión del pueblo, preparando a las comunidades para afrontar los desafíos actuales.</p><img src="/uploads/1758044362532-photo_2025-09-14_17-00-09.webp"><p>En primer lugar, se organizó un taller de dos días en coordinación con la contraloría del estado, donde participaron alcaldes, alcaldesas, cámaras municipales y administradores. Este taller tuvo como objetivo promover buenas prácticas fiscales, esenciales para fortalecer la gestión pública y garantizar la transparencia en el uso de los recursos.</p><img src="/uploads/1758044388406-photo_2025-09-14_17-00-19.webp"><p>Además, se realizó una reunión habitual del Partido Socialista Unido de Venezuela (PSUV) en el estado Guárico, donde se discutió la preparación de las bases para la defensa de la patria. Durante esta actividad, se destacó la importancia de la organización y el trabajo conjunto con la milicia nacional, asegurando que el equipo está listo para desplegarse en función de la seguridad y el bienestar del pueblo.</p><img src="/uploads/1758044407315-photo_2025-09-14_17-00-24.webp"><p>Por su parte, en otra actividad significativa, el gobernador participó en una reunión nacional con la juventud del Partido Socialista Unido de Venezuela (PSUV). Este encuentro se centró en la movilización y formación de los jóvenes, quienes desempeñan un papel crucial en la defensa y el desarrollo del país. Se enfatizó la necesidad de que la juventud esté activa y comprometida con la construcción de un futuro mejor.</p><img src="/uploads/1758044438430-photo_2025-09-14_17-00-19.webp"><p>Finalmente, desde El Fuerte Cacique Conopoima en San Juan de los Morros, se llevó a cabo una capacitación para el pueblo, que se alista para combatir en cualquier escenario. Este evento reafirma la disposición del pueblo guariqueño para defender su patria con determinación y valentía.</p>	La agenda de trabajo del gobernador Donald Donaire resalta su compromiso con el desarrollo y la seguridad del estado Guárico, fortaleciendo la unión y la preparación de su pueblo ante cualquier desafío que pueda surgir	Stephanny Castro (ECS-Unerg) 	Roxelvys López 	t	2025-09-16 17:40:48.124	2025-09-16 17:40:48.124	2025-09-16 17:40:48.124	1
28	Exitosa jornada médica para los cultores y cultoras de la patria	<p>En aras de garantizarle el bienestar social a los cultores y cultoras de la patria, en la Casa de la Cultura Napoleón Baltodano, parroquia El Sombrero, estado Guárico; se llevó a cabo una nueva Jornada de Salud Integral dirigida a todos aquellos trabajares culturales de esta población.</p><p>Esta actividad, está enmarcada en el 6to vértice de la Gran Misión Viva Venezuela Mi Patria Querida: Brindar atención médica integral y promover el bienestar de aquellos que dedican su vida a la expresión artística de la localidad.</p><p></p><img src="/uploads/1758118816413-1003220778.webp"><p></p><p>‎La jornada incluyó servicios de salud como consultas de medicina interna, medicina general, pediatría, ginecología, inmunización, discapacidad, odontología, farmacia, entre otros.</p><p>Es importante resaltar, que en la jornada fueron atendidos más de 180 cultores, lo cual&nbsp; representa un esfuerzo conjunto del Gobierno Nacional, el Gobierno Regional representando por el gobernador Donald Donaire, la Autoridad Única de Cultura del estado Guárico, así como la autoridad única de Salud en la entidad y las demás instituciones de salud para garantizar el acceso a servicios de calidad para los cultores y cultoras, reconociendo su invaluable contribución al patrimonio cultural de Venezuela.</p><p></p><img src="/uploads/1758118859994-1003220790.webp"><p></p><p>Por su parte, el cultor Luis Barrios, agradeció al presidente Nicolás Maduro y al gobernador Donald Donaire por impulsar este beneficio para los Cultores y Cultoras. “Gracias porque hoy recibimos atención médica y medicamentos gratuitos, sigamos adelante ¡Viva Venezuela Mi Patria Querida!” expresó Barrios.</p>	En aras de garantizarle el bienestar social a los cultores y cultoras de la patria, en la Casa de la Cultura Napoleón Baltodano, parroquia El Sombrero, estado Guárico; se llevó a cabo una nueva Jornada de Salud Integral dirigida a todos aquellos trabajares culturales de esta población	Prensa FMC	Prensa FMC	f	2025-09-17 14:22:26.443	2025-09-17 14:22:26.443	2025-09-17 14:22:26.443	10
29	Santa María de Ipire inaugura Juegos Comunales 2025 con fútbol comunitario	<p>Con entusiasmo y espíritu deportivo, Santa María de Ipire arranco con la disciplina de fútbol en la primera fase de los Juegos Comunales 2025, jóvenes de distintas comunidades se dieron cita en el campo municipal para disputar los primeros encuentros, marcando el inicio de una jornada que promete fortalecer el tejido social a través del deporte. La actividad, organizada por el Instituto Regional de Deporte, busca fomentar la participación ciudadana y el talento local en un ambiente de sana competencia.</p><p>&nbsp;</p><p>Los Juegos Comunales 2025 no solo representan una plataforma deportiva, sino también una apuesta por el desarrollo integral de la juventud guariqueña. Durante la jornada inaugural, se realizaron tres encuentros en la categoría sub-15, donde destacaron los equipos de El Mereyal, La Ceiba y El Samán, cada partido estuvo acompañado por árbitros certificados y personal médico, garantizando la seguridad y el cumplimiento de las normas.</p><p></p><img src="/uploads/1758119805222-Nota_1_Santa_Mar__a_de_Ipire_inaugura_Juegos_Comunales_2025_con_f__tbol_comunitario__2_.webp"><p></p><p>&nbsp;</p><p>Aunque los resultados fueron motivo de celebración para algunos, el verdadero triunfo fue el ambiente de camaradería que reinó en el campo, la comunidad de Santa María de Ipire se volcó en apoyo a esta iniciativa, ofreciendo refrigerios, logística y voluntariado. Comerciantes locales aprovecharon la ocasión para instalar puestos de comida, generando una dinámica económica paralela que benefició a todos.</p><p>&nbsp;</p><p>La jornada cerró con una presentación cultural de danza tradicional, integrando deporte y cultura en una misma celebración, donde las autoridades regionales destacaron que esta primera fase se extenderá durante dos semanas, abarcando otras disciplinas como voleibol, atletismo y ajedrez. Cada municipio tendrá su momento de protagonismo, y los ganadores avanzarán a la fase estadal prevista para noviembre.</p><p></p><p></p><img src="/uploads/1758119969170-Nota_1_Santa_Mar__a_de_Ipire_inaugura_Juegos_Comunales_2025_con_f__tbol_comunitario__5_.webp"><p>&nbsp;</p><p>Con el balón rodando y las emociones a flor de piel, los Juegos Comunales 2025 arrancan con fuerza en Santa María de Ipire, dejando claro que el deporte es mucho más que competencia, es identidad, es comunidad, es futuro. La jornada de fútbol fue solo el comienzo de una fiesta que promete recorrer cada rincón de Guárico, sembrando valores y cosechando sueños.</p>	Con entusiasmo y espíritu deportivo, Santa María de Ipire arranco con la disciplina de fútbol en la primera fase de los Juegos Comunales 2025, jóvenes de distintas comunidades se dieron cita en el campo municipal para disputar los primeros encuentros	Hector Ortiz 	Sibci-Guárico	f	2025-09-17 14:41:31.392	2025-09-17 14:41:31.392	2025-09-17 14:41:31.392	3
30	Embellecimiento fortalece pertenencia entre atletas y comunidad en Ciudad Olímpica	<p>Desde la Ciudad Olímpica de San Juan de los Morros, se llevó a cabo una jornada de mantenimiento y embellecimiento liderada por el Instituto Regional de Deporte. Desde tempranas horas, trabajadores, técnicos y voluntarios se desplegaron por los distintos espacios deportivos para realizar labores de limpieza, pintura, reparación de estructuras y acondicionamiento general. La iniciativa busca no solo preservar las instalaciones, sino también elevar el sentido de pertenencia entre los atletas y la comunidad.</p><p>&nbsp;</p><p>Durante el operativo, se atendieron áreas clave como el estadio de atletismo, las canchas múltiples, el gimnasio cubierto y las zonas verdes que rodean el complejo, se realizaron trabajos de poda, recolección de desechos, pintura de gradas y revisión de luminarias. Además, se reforzaron medidas de seguridad para garantizar que los espacios sean accesibles y seguros para todos los usuarios, la participación activa del personal técnico, como administrativo fue fundamental para el éxito de la jornada.</p><p></p><img src="/uploads/1758120700583-Nota_2_Embellecimiento_fortalece_pertenencia_entre_atletas_y_comunidad_en_Ciudad_Ol__mpica__6_.webp"><p>&nbsp;</p><p>Más allá del aspecto físico, estas jornadas tienen un impacto emocional y simbólico, ver a la Ciudad Olímpica reluciente es un recordatorio de que el deporte es una herramienta de transformación social, cada brocha de pintura, cada bolsa de basura recogida, representa un acto de amor por el futuro de la juventud guariqueña. En tiempos donde el esfuerzo colectivo cobra especial valor, estas acciones se convierten en gestos de esperanza y construcción.</p><p>&nbsp;</p><p>Con esta jornada, San Juan de los Morros reafirma su lugar como espacio deportivo del estado y como modelo de articulación entre gobierno, comunidad y atletas. El deporte no solo se practica, también se cuida, y cuando se hace con pasión, compromiso y sentido de pertenencia, los resultados se ven dentro, como fuera de la cancha.</p><p></p><img src="/uploads/1758120754781-Nota_2_Embellecimiento_fortalece_pertenencia_entre_atletas_y_comunidad_en_Ciudad_Ol__mpica__2_.webp"><p></p>	Desde la Ciudad Olímpica de San Juan de los Morros, se llevó a cabo una jornada de mantenimiento y embellecimiento liderada por el Instituto Regional de Deporte	Hector Ortiz 	Cortesía 	f	2025-09-17 14:52:58.113	2025-09-17 14:52:58.113	2025-09-17 14:52:58.113	3
31	Alfreina Álvarez acompañó el inicio del Año Escolar 2025-2026 en el municipio Francisco de Miranda	<p>Alcaldesa del municipio Francisco de Miranda, Alfreina Álvarez acompañó el inicio del año escolar 2025-2026, entre risas y alegría de los niños y niñas de la patria, este lunes 15 de septiembre, desde el Complejo Educativo Ramón Francisco Feo, ubicado en la ciudad de Calabozo.</p><p></p><img src="/uploads/1758121247038-Inicio_A__o_Escolar._Miranda._Gu__rico._9.webp"><p>&nbsp;</p><p>En este acto, lalideresa municipal, estuvo acompañada delprofesor Carlos Garrido, Director del Centro de Desarrollo de la Calidad Educativa (CDCE Miranda), la directora del plantel Adriana Isseles, el personal docente, administrativo, obrero, el equipo de Salud Asic Dinamitas y la comunidad en general.</p><p>&nbsp;</p><p>Fuentes oficiales informaron que en el resto de las instituciones educativas del CDCE Miranda, igualmente iniciaron el año escolar, con actividades cívicas, culturales, recreativas, deportivas, de salud y de integración, social, con el mayor entusiasmo de motivar a los niños, niñas y adolescentes en este nuevo periodo escolar.</p><p></p><img src="/uploads/1758121282618-Inicio_A__o_Escolar._Miranda._Gu__rico._10.webp"><p>&nbsp;</p><p>Por su parte, la directora Adriana Isseles del complejo educativo que sirvió de epicentro para iniciar las clases en el municipio, afirmó que este inicio del año escolar había sido exitoso en el plantel, con un 80 % de la participación estudiantil y con el 100% del personal incorporado,“con mucha alegría entusiasmo, expectativas para este año escolar hemos recibido a los niños y niñas de la patria”, fijó.</p>	Alcaldesa del municipio Francisco de Miranda, Alfreina Álvarez acompañó el inicio del año escolar 2025-2026, entre risas y alegría de los niños y niñas de la patria, este lunes 15 de septiembre, desde el Complejo Educativo Ramón Francisco Feo, ubicado en la ciudad de Calabozo	Prensa Alcaldía de Miranda 	Juan C. García y Carlos Pérez	f	2025-09-17 15:01:48.931	2025-09-17 15:01:48.931	2025-09-17 15:01:48.931	9
32	Entrega de kits deportivos fortalece a la juventud y el poder comunal en Guárico	<p>En un acto cargado de entusiasmo y participación comunitaria, el Consejo Federal de Gobierno, a través de su director en el estado, Roberto Soares, acompañó la entrega de materiales deportivos correspondientes al proyecto ganador de la Comuna Lanceros del Llano, una iniciativa destinada a promover el empoderamiento juvenil y el fortalecimiento de la organización comunal.</p><p>Durante la actividad, Soares destacó que este logro es fruto de la Revolución Bolivariana y del impulso del presidente Nicolás Maduro, quien ha promovido la participación de la juventud en la construcción del poder popular.</p><p></p><img src="/uploads/1758121774095-photo_2025-09-14_12-11-24.webp"><p></p><p>“Aquí estamos acompañando a las comunidades que integran esta comuna. Este es un logro de nuestro presidente Nicolás Maduro, quien impulsa proyectos inéditos que fomentan el liderazgo juvenil. Estos materiales servirán para fortalecer la actividad deportiva en diez consejos comunales que conforman la Comuna Lanceros del Llano”, expresó Soares.</p><p>La dotación, elegida mediante el voto de las propias comunidades, incluyó balones de fútbol sala y de campo, mallas, toldos y uniformes para distintas disciplinas.</p><p></p><img src="/uploads/1758121900563-photo_2025-09-14_12-11-26.webp"><p></p><p>&nbsp;Más de 1.300 jóvenes pertenecientes a los diez consejos comunales que integran la comuna resultaron beneficiados.</p><p>Asimismo, Soares reiteró el llamado a los voceros y voceras de los consejos comunales a sumarse al proceso de renovación y adecuación impulsado por el presidente Maduro, con el respaldo del gobernador Donald Donaire y de la alcaldesa del municipio Francisco de Miranda, Alfreina Álvarez.</p><p>Por su parte, Alexander Aparicio, representante del Banco de la Comuna Lanceros del Llano, subrayó la importancia del proyecto:</p><p>“Hoy celebramos el lanzamiento del proyecto La Juventud, gracias a la Revolución Bolivariana. Esta dotación de materiales fortalece la práctica deportiva en nuestro municipio. Agradecemos al presidente Nicolás Maduro, al gobernador Donald Donaire y a nuestra alcaldesa Alfreina Álvarez por apoyar el deporte, que es fundamental para que nuestros niños y jóvenes se formen en valores y se alejen de los malos caminos”.</p><p>El evento cerró con un compartir deportivo entre las comunidades, reafirmando el compromiso de continuar promoviendo la organización comunal y el desarrollo integral de la juventud a través del deporte.</p>	En un acto cargado de entusiasmo y participación comunitaria, el Consejo Federal de Gobierno, a través de su director en el estado, Roberto Soares, acompañó la entrega de materiales deportivos correspondientes al proyecto ganador de la Comuna Lanceros del Llano.	José Gregorio De Nicolais	Cortesía	f	2025-09-17 15:16:35.951	2025-09-17 15:16:35.951	2025-09-17 15:16:35.951	3
33	Inspeccionan funcionamiento operativo y la calidad de atención en el Hospital Dr. Israel Ranuárez Balza	<p>Jesús Rojas, autoridad única en salud del estado Guárico, junto a los directores regionales de Red Hospitalaria, Epidemiología, Enfermería, Recursos Humanos, Almacén, Promoción Social, Administración, Servicios Generales e Infraestructura, realizó un recorrido por las distintas áreas del Hospital Dr. Israel Ranuárez Balza, ubicado en el municipio Juan Germán Roscio Nieves, con el objetivo de verificar el funcionamiento operativo y la calidad de atención brindada a los pacientes y sus familiares.</p><p>Durante la jornada, Rojas sostuvo una reunión con el personal del centro hospitalario, atendiendo de manera directa sus planteamientos y reafirmando el compromiso institucional con el bienestar de los trabajadores.</p><p></p><img src="/uploads/1758122564605-8.webp"><p></p><p>Por otra parte, se llevó a cabo un operativo de recuperación de camas clínicas, limpieza en los distintos servicios, poda de árboles, así como mejoras en el sistema de iluminación interna y externa, con el propósito de ofrecer espacios más dignos y eficientes para la atención médica.</p><p>Estas acciones son coordinadas por el equipo regional de Servicios Generales, bajo la dirección de Jesús Rojas y con el respaldo del gobernador del estado Guárico, Donald Donaire, consolidando una vez más el compromiso con la salud del pueblo guariqueño.</p><p></p><img src="/uploads/1758122820785-6.webp"><p></p><p>En este sentido, Rojas explicó que estas medidas permitirán garantizar servicios oportunos y de calidad. “Cada cama recuperada, cada bombillo encendido, cada espacio limpio representa el respeto por la vida y por quienes confían en nosotros”. Estamos alineados con las políticas del presidente Nicolás Maduro y las directrices de la ministra del Poder Popular para la Salud, Dra. Magaly Gutiérrez.</p><p>De igual forma, destacó que “estas acciones no solo benefician a los usuarios, sino también a cada trabajador que día a día entrega su esfuerzo en este hospital, porque ellos hacen posible el funcionamiento de este centro de salud”.</p><p>Por último, agregó que “la salud no se decreta, se construye con hechos y aquí estamos, construyendo bienestar para todos los guariqueños”.</p>	Jesús Rojas, autoridad única en salud del estado Guárico, junto a los directores regionales de Red Hospitalaria, Epidemiología, Enfermería, Recursos Humanos, Almacén, Promoción Social, Administración, Servicios Generales e Infraestructura, realizó un recorrido por las distintas áreas del Hospital	María Mejías 	Cortesía 	f	2025-09-17 15:27:38.967	2025-09-17 15:27:38.967	2025-09-17 15:27:38.967	10
37	Gobierno de Guárico entrega pupitres para fortalecer la educación universitaria	<p>Como parte del compromiso del presidente Nicolás Maduro de garantizar una educación pública, gratuita y de calidad, por instrucciones del Ministro de Educación Universitaria, Ricardo Sánchez, y el gobierno de Guárico, bajo la dirección del gobernador Donald Donaire, se inició con la entrega de un primer lote de pupitres a la Universidad Nacional Experimental de la Seguridad (UNES).</p><p>Cabe destacar que esta iniciativa busca mejorar la infraestructura de las casas de estudios en el estado y beneficiar a la comunidad estudiantil, de manera que cada institución académica tenga espacios óptimos y que las aula cuenten con un mobiliario adecuado para el desarrollo de las actividades académicas.</p><p>​El Dr. César Gómez, coordinador regional del Consejo Estadal de Gestión Universitaria del estado Guárico (CEGU), señaló que, "por instrucciones del ministro Ricardo Sánchez y en el marco del Consejo Estatal de Gestión Universitaria, dirigido por el gobernador Donald Donaire, se está llevando a cabo la entrega de un primer lote de pupitres, y a su vez se están recuperando diversos espacios académicos".</p><img src="/uploads/1758124369638-1.webp"><p>Asimismo, Gómez, destacó que esta acción se realiza en colaboración con todo el equipo de la Universidad Nacional Experimental de la Seguridad (UNES), y que tiene como objetivo seguir garantizando una educación pública gratuita y de calidad como lo ha dispuesto el presidente Nicolás Maduro.</p><p>​Por su parte, Marcia Palacios, decana del Núcleo UNES Guárico, indicó que, en cumplimiento de las políticas establecidas por el presidente Nicolás Maduro, están recibiendo este significativo aporte, "quiero agradecer también a nuestro gobernador Donald Donaire, quien está cumpliendo constantemente con cada una de las políticas establecidas, llevando grandes beneficios a la comunidad y al pueblo guariqueño", afirmó.</p><p>​Rudy Rivero, estudiante del PNF y Servicio Policial, manifestó su alegría por los beneficios recibidos, destacando que "este apoyo representa un avance significativo en nuestra&nbsp; preparación académica". Agradeciendo al ministro Ricardo Sánchez y al gobernador Donald Donaire por su compromiso con la educación en el estado Guárico.</p><p>​De igual forma, Jesús Martínez, estudiante del PNF en Investigación Penal, extendió su agradecimiento por el beneficio, "estas mejoras a la estructura de nuestra sede nos permite recibir una educación de calidad, y contar con espacios óptimos que garantizan un mejor desarrollo a nuestra formación", señaló.</p><p>Con la entrega de estos pupitres y la rehabilitación de los espacios, el gobierno de Guárico, en conjunto con el Consejo Estadal de Gestión Universitaria (CEGU), demuestran su compromiso con el fortalecimiento de la educación superior. Estas acciones no solo mejoran la infraestructura de la UNES, sino que también garantizan a los futuros profesionales de la seguridad la posibilidad de formarse en un ambiente digno y con las herramientas necesarias.</p>	Cabe destacar que esta iniciativa busca mejorar la infraestructura de las casas de estudios en el estado y beneficiar a la comunidad estudiantil, de manera que cada institución académica tenga espacios óptimos y que las aula cuenten con un mobiliario adecuado para el desarrollo de las actividades.	Fabian Izquiel	Yosgaiver Huerfano 	f	2025-09-17 15:53:35.273	2025-09-17 15:53:35.273	2025-09-17 15:53:35.273	9
34	PSUV ratifica unidad cívico-militar y disposición de defender la soberanía de Venezuela	<p>En una rueda de prensa encabezada por la vocería del secretario general del Partido Socialista Unido de Venezuela (PSUV), Diosdado Cabello, junto a la dirección nacional, se reafirmó la estrategia de "unidad clara y definida" entre el Gobierno Nacional, el pueblo y la Fuerza Armada Nacional Bolivariana (FANB) como eje central para la defensa de la nación.</p><p>‎Desde la sede de la tolda roja, Cabello destacó la cohesión existente entre el alto mando político y el alto mando militar para hacer frente a cualquier escenario.</p><p>‎Subrayó que esta unidad se encuentra bajo el liderazgo del presidente de la República, Nicolás Maduro, quien dirige cada acción y decisión en conjunto con la FANB y el PSUV.</p><img src="/uploads/1758123375215-photo_2025-09-16_11-58-01.webp"><p>‎El dirigente nacional informó que, siguiendo las directrices emanadas del Congreso del PSUV y del presidente Maduro, se han realizado más de 47.000 asambleas populares a lo largo y ancho del territorio. Además, precisó que de estos encuentros se han recogido importantes aportes de las comunidades con el objetivo de abordar la "transición de la lucha no armada a la lucha armada", fortaleciendo la preparación para la defensa integral de la soberanía.</p><p>‎Finalmente, Cabello envió un mensaje contundente, asegurando que el país se mantiene en un estado de paz "verdadera y real" que garantiza la tranquilidad de los ciudadanos. Enfatizó que Venezuela no detendrá su marcha y que el pueblo venezolano no está dispuesto a rendirse ni a permitir que le sea arrebatada su soberanía.</p><p>‎ "Defenderemos a Venezuela contra quien sea, cuando sea y como sea, nuestro pueblo jamás se rendirá ni dejará que le arrebaten su Soberanía" declaró Cabello.</p>	En una rueda de prensa encabezada por la vocería del secretario general del Partido Socialista Unido de Venezuela (PSUV), Diosdado Cabello, junto a la dirección nacional, se reafirmó la estrategia de "unidad clara y definida".	‎Saray Sumoza ECS-Unerg 	Cortesía 	t	2025-09-17 15:37:02.549	2025-09-17 15:37:02.549	2025-09-17 15:37:51.636	1
35	Gobierno Bolivariano transforma el liceo José Calixto Morín de Tucupido	<p>El Gobierno Bolivariano, en un firme compromiso con el futuro de la juventud guariqueña, ha materializado una significativa inversión en el sistema educativo de la región, beneficiando directamente a más de 525 alumnos de educación media general del Liceo Bolivariano José Calixto Morín, en Tucupido, municipio José Félix Ribas. Gracias al trabajo articulado entre el presidente Nicolás Maduro, el gobernador del estado Guárico, Donal Donaire, y el alcalde del municipio José Félix Ribas, Daniel Charaima, este emblemático centro educativo ha sido completamente rehabilitado, ofreciendo ahora espacios dignos y modernos para el avance del proceso de enseñanza-aprendizaje.</p><p>La jornada de entrega de estas modernas instalaciones, fortalece el sistema educativo de la zona, la inauguración fue encabezada por el alcalde Daniel Charaima, quien estuvo acompañado de autoridades políticas. Entre ellas, Osler Moreno, secretario de Despacho del Ejecutivo Regional; el diputado del Consejo Legislativo de Guárico, Kevin Idrogo; y Migdalia Hurtado, coordinadora regional de FEDE (Fondo Nacional de Desarrollo de la Educación).</p><p>La rehabilitación integral del Liceo José Calixto Morín incluyó la adecuación de un total de 22 aulas, garantizando así un ambiente de aprendizaje óptimo para cada uno de los estudiantes. Pero la transformación va mucho más allá. Este importante centro educativo ahora cuenta con modernas instalaciones que incluyen:</p><p>*&nbsp;&nbsp; Comedor: Un espacio renovado para asegurar la nutrición de los estudiantes.</p><p>*&nbsp;&nbsp; Sala de Autogobierno: Fomentando la participación estudiantil y el desarrollo de liderazgos.</p><p>*&nbsp;&nbsp; Sala de Computación: Dotada para potenciar las habilidades digitales de los jóvenes.</p><p>*&nbsp;&nbsp; Centro Bolivariano de Informática y Telemática (CEBIT): Un espacio tecnológico avanzado para el acceso a la información y la comunicación.</p><p>* Rehabilitación de espacios deportivos entre ellos la cancha del liceo.</p><img src="/uploads/1758123728266-photo_2025-09-16_14-17-02.webp"><p>Además de la rehabilitación de los espacios existentes, la inversión se extendió a la construcción de 5 aulas nuevas. Esta ampliación responde a la visión de futuro del gobierno, consolidando el crecimiento de la matrícula estudiantil en la región y asegurando que más jóvenes tengan acceso a una educación de calidad.</p><p>Los trabajos de rehabilitación abarcaron la pintura completa de las áreas internas y externas del liceo, una electrificación integral de las áreas comunes para garantizar la seguridad y el funcionamiento de los nuevos equipos, y la adecuación exhaustiva de baños, biblioteca, comedor y cancha deportiva.</p><p>Cada detalle ha sido cuidadosamente atendido para crear un entorno educativo que inspire, motive y facilite el desarrollo académico y personal de los estudiantes.</p><p>El alcalde Daniel Charaima, visiblemente complacido, destacó la importancia de esta obra para el futuro del municipio y del estado Guárico. "Hoy no solo entregamos aulas, entregamos oportunidades. Estas instalaciones son un reflejo del compromiso inquebrantable del presidente Nicolás Maduro y del gobernador Donal Donaire con la educación de nuestra patria. Estamos invirtiendo en el futuro, en la formación de hombres y mujeres que serán los líderes mañana. El liceo José Calixto Morín se transforma para seguir siendo un pilar fundamental en el desarrollo de Tucupido y de toda la región guariqueña", afirmó Charaima.</p><p>Esta iniciativa se enmarca en la política nacional de dignificación y fortalecimiento del sistema educativo venezolano, asegurando que cada estudiante tenga acceso a espacios seguros, equipados y propicios para su formación integral, demostrando que la educación sigue siendo prioridad para el Gobierno</p>	El Gobierno Bolivariano, en un firme compromiso con el futuro de la juventud guariqueña, ha materializado una significativa inversión en el sistema educativo de la región, beneficiando directamente a más de 525 alumnos de educación media general del Liceo Bolivariano José Calixto Morín, en Tucupido	Julio Ramos	Cortesía 	t	2025-09-17 15:42:25.288	2025-09-17 15:42:25.288	2025-09-17 15:42:48.395	9
36	Gran Misión Venezuela Mujer despliega Jornada Médica Integral 	<p>La iniciativa, que benefició a cientos de mujeres y niños, ofreció consultas especializadas, ecos obstétricos y entrega de suplementos de forma gratuita, reafirmando el compromiso del gobierno con la salud pública y la protección de la familia.</p><p>&nbsp;En el marco del Vértice de Salud de la Gran Misión Venezuela Mujer, se llevó a cabo con gran éxito una Jornada de Atención Integral en salud para las mujeres del municipio José Tadeo Monagas. El evento, realizado en la Escuela Básica José Tadeo Monagas, contó con una masiva participación y representa un avance concreto en las políticas de protección social del Gobierno Nacional.</p><p>La actividad fue el resultado del trabajo articulado entre la Gran Misión Venezuela Mujer, la Gobernación del Estado Bolivariano de Guárico, la Alcaldía del Municipio José Tadeo Monagas, el ASIC Dr. “Ricardo Isidro Bernal Ramos”, Dirección de Desarrollo Social, Hospital José Francisco Torrealba y el Instituto de Previsión y Asistencia Social para el Personal del Ministerio de Educación (Ipasme).</p><p>La jornada brindó un amplio portafolio de servicios médicos gratuitos, incluyendo: Consultas de medicina general: Evaluación primaria y diagnóstico de patologías comunes. Consultas de Medicina Interna: Atención especializada para enfermedades en adultos. Consultas de Pediatría: Control y cuidado de la salud de los niños y niñas. Entrega de kits vitamínicos para embarazadas: Suplementación esencial para fortalecer la nutrición de la madre y el futuro bebé. Realización de Ecos Obstétricos: Estudios ecográficos gratuitos para un control prenatal de calidad.</p><img src="/uploads/1758123945076-ca51bcc5-887a-4729-9f46-daddd6d17352.webp"><p>La jornada contó con la presencia y supervisión de la Coordinadora Regional&nbsp; de la Gran Misión Venezuela Mujer, Angie Carrillo, quien recalcó el objetivo de la iniciativa: "Estamos en el territorio, cumpliendo las instrucciones de nuestro Presidente Nicolás Maduro y de nuestra Ministra Diva Guzmán, trabajando en conjunto con el gobernador Donald Donaire y el alcalde Pedro Solórzano. Llegar hasta aquí, hasta el corazón de las comunidades, es la muestra más clara de que la revolución de las mujeres camina y se hace realidad en hechos concretos de salud y bienestar".</p><p>María Ortuño, Comisionada municipal para el Área de Protección Social y Directora del Ipasme, expresó: "Desde el Ipasme nos sumamos con todo nuestro equipo y logística a estas jornadas que dignifican a la mujer venezolana. Para nosotros es un honor contribuir con nuestro talento humano y expertos en salud para llevar bienestar a las comunidades, cumpliendo así con el legado de nuestro Presidente Maduro de priorizar la atención social"</p><p>El impacto de la jornada se vio reflejado en la voz de sus beneficiarias. Andrea Gómez, una de las mujeres atendidas, acotó: "Estoy enormemente agradecida con esta oportunidad de acceder a estas atenciones de manera gratuita. Esto es una bendición gracias a todos".</p><p>Esta iniciativa refuerza el poder de la gestión articulada entre las distintas instancias de gobierno, asegurando los insumos médicos, el talento humano y la logística necesaria para atender a la población.</p><p>La Gran Misión Venezuela Mujer continúa recorriendo el estado Guárico, llevando esperanza, salud y protección integral a todas las mujeres, en reconocimiento a su rol protagónico en la construcción de la Patria.</p>	La iniciativa, que benefició a cientos de mujeres y niños, ofreció consultas especializadas, ecos obstétricos y entrega de suplementos de forma gratuita, reafirmando el compromiso del gobierno con la salud pública y la protección de la familia.	Prensa Orituco	Cortesía 	f	2025-09-17 15:47:57.953	2025-09-17 15:47:57.953	2025-09-17 15:47:57.953	10
\.


--
-- Data for Name: NoticiaMedia; Type: TABLE DATA; Schema: public; Owner: cg_user
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
14	36
16	51
17	54
18	57
19	60
24	68
27	80
28	87
29	90
30	93
31	96
32	99
33	102
34	104
35	106
36	108
37	110
\.


--
-- Data for Name: Opinion; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Opinion" (id, titulo, contenido, fecha, "columnistaId", destacado) FROM stdin;
1	ddddd	bmnbmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn	2025-09-12 00:00:00	1	f
\.


--
-- Data for Name: PDF; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."PDF" (id, url, fecha, descripcion) FROM stdin;
\.


--
-- Data for Name: Rol; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Rol" (id, nombre) FROM stdin;
1	admin
\.


--
-- Data for Name: Seccion; Type: TABLE DATA; Schema: public; Owner: cg_user
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
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."Usuario" (id, username, password, "createdAt") FROM stdin;
1	admin	$2b$12$f/Cl5ACxR5N6hE0I9TMGmOk7FXSrt75yHxUUPidRHQq1YJ.XIxYPS	2025-09-12 03:08:46.903
\.


--
-- Data for Name: UsuarioRol; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."UsuarioRol" ("usuarioId", "rolId") FROM stdin;
1	1
\.


--
-- Data for Name: View; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public."View" (id, nombre, descripcion, tipo, configuracion, activo, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: cg_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6320e47b-a8ce-482d-8976-04b2c3f3f69f	d700444c7ac8664256be2bbcebb0b5819667787156ea3619528bf07cdba8ae60	2025-09-12 00:45:31.319426+00	20250730153952_init	\N	\N	2025-09-12 00:45:28.731456+00	1
be6811fa-f330-4144-8a5c-609ff2ef6b55	b5f39730726e92a918824cc6481ef0d51403d33199af6b969aacde65947146d6	2025-09-12 00:45:31.476831+00	20250731150839_rename_publicidad_to_contenido_destacado	\N	\N	2025-09-12 00:45:31.321312+00	1
6fc5cfe6-ebeb-40e5-ac80-6386b6352917	f29481e09527ee1cf365f6ba29299d52c56907e8f0aeba402fd317fe68e81180	2025-09-12 00:45:32.24532+00	20250803202147_add_opinion_section_relations	\N	\N	2025-09-12 00:45:31.478543+00	1
\.


--
-- Name: Columnista_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Columnista_id_seq"', 2, true);


--
-- Name: ContenidoDestacado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."ContenidoDestacado_id_seq"', 7, true);


--
-- Name: Editorial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Editorial_id_seq"', 1, true);


--
-- Name: Media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Media_id_seq"', 110, true);


--
-- Name: Noticia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Noticia_id_seq"', 37, true);


--
-- Name: Opinion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Opinion_id_seq"', 1, true);


--
-- Name: PDF_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."PDF_id_seq"', 1, false);


--
-- Name: Rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Rol_id_seq"', 3, true);


--
-- Name: Seccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Seccion_id_seq"', 10, true);


--
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 4, true);


--
-- Name: View_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cg_user
--

SELECT pg_catalog.setval('public."View_id_seq"', 1, false);


--
-- Name: Columnista Columnista_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Columnista"
    ADD CONSTRAINT "Columnista_pkey" PRIMARY KEY (id);


--
-- Name: ContenidoDestacado ContenidoDestacado_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."ContenidoDestacado"
    ADD CONSTRAINT "ContenidoDestacado_pkey" PRIMARY KEY (id);


--
-- Name: Editorial Editorial_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Editorial"
    ADD CONSTRAINT "Editorial_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: NoticiaMedia NoticiaMedia_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_pkey" PRIMARY KEY ("noticiaId", "mediaId");


--
-- Name: Noticia Noticia_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_pkey" PRIMARY KEY (id);


--
-- Name: Opinion Opinion_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Opinion"
    ADD CONSTRAINT "Opinion_pkey" PRIMARY KEY (id);


--
-- Name: PDF PDF_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."PDF"
    ADD CONSTRAINT "PDF_pkey" PRIMARY KEY (id);


--
-- Name: Rol Rol_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Rol"
    ADD CONSTRAINT "Rol_pkey" PRIMARY KEY (id);


--
-- Name: Seccion Seccion_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Seccion"
    ADD CONSTRAINT "Seccion_pkey" PRIMARY KEY (id);


--
-- Name: UsuarioRol UsuarioRol_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("usuarioId", "rolId");


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: View View_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."View"
    ADD CONSTRAINT "View_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Rol_nombre_key; Type: INDEX; Schema: public; Owner: cg_user
--

CREATE UNIQUE INDEX "Rol_nombre_key" ON public."Rol" USING btree (nombre);


--
-- Name: Seccion_nombre_key; Type: INDEX; Schema: public; Owner: cg_user
--

CREATE UNIQUE INDEX "Seccion_nombre_key" ON public."Seccion" USING btree (nombre);


--
-- Name: Usuario_username_key; Type: INDEX; Schema: public; Owner: cg_user
--

CREATE UNIQUE INDEX "Usuario_username_key" ON public."Usuario" USING btree (username);


--
-- Name: Media Media_editorialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_editorialId_fkey" FOREIGN KEY ("editorialId") REFERENCES public."Editorial"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Media Media_opinionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES public."Opinion"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: NoticiaMedia NoticiaMedia_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: NoticiaMedia NoticiaMedia_noticiaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."NoticiaMedia"
    ADD CONSTRAINT "NoticiaMedia_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES public."Noticia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Noticia Noticia_seccionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES public."Seccion"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Opinion Opinion_columnistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."Opinion"
    ADD CONSTRAINT "Opinion_columnistaId_fkey" FOREIGN KEY ("columnistaId") REFERENCES public."Columnista"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsuarioRol UsuarioRol_rolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES public."Rol"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsuarioRol UsuarioRol_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cg_user
--

ALTER TABLE ONLY public."UsuarioRol"
    ADD CONSTRAINT "UsuarioRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict IwcTmNmJ32b3NNgTgipix2kK71zcmJWKTi8ygS6G9kB2u9LogALgLhMUaoGpvtR

