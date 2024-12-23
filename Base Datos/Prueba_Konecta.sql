PGDMP  ;    %                |            Prueba_konecta    17.2    17.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            	           1262    16388    Prueba_konecta    DATABASE     �   CREATE DATABASE "Prueba_konecta" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
     DROP DATABASE "Prueba_konecta";
                     postgres    false            �            1259    16399 	   empleados    TABLE     �   CREATE TABLE public.empleados (
    id integer NOT NULL,
    fecha_ingreso date NOT NULL,
    nombre character varying(50) NOT NULL,
    salario numeric(10,2) NOT NULL
);
    DROP TABLE public.empleados;
       public         heap r       postgres    false            �            1259    16398    empleados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.empleados_id_seq;
       public               postgres    false    220            
           0    0    empleados_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;
          public               postgres    false    219            �            1259    16406    solicitudes    TABLE     �   CREATE TABLE public.solicitudes (
    id integer NOT NULL,
    codigo character varying(50) NOT NULL,
    descripcion character varying(50) NOT NULL,
    resumen character varying(500) NOT NULL,
    id_empleado integer NOT NULL
);
    DROP TABLE public.solicitudes;
       public         heap r       postgres    false            �            1259    16405    solicitudes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.solicitudes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.solicitudes_id_seq;
       public               postgres    false    222                       0    0    solicitudes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.solicitudes_id_seq OWNED BY public.solicitudes.id;
          public               postgres    false    221            �            1259    16390    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16389    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    218                       0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            b           2604    16402    empleados id    DEFAULT     l   ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);
 ;   ALTER TABLE public.empleados ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            c           2604    16409    solicitudes id    DEFAULT     p   ALTER TABLE ONLY public.solicitudes ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_id_seq'::regclass);
 =   ALTER TABLE public.solicitudes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            a           2604    16393    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218                      0    16399 	   empleados 
   TABLE DATA           G   COPY public.empleados (id, fecha_ingreso, nombre, salario) FROM stdin;
    public               postgres    false    220   �                 0    16406    solicitudes 
   TABLE DATA           T   COPY public.solicitudes (id, codigo, descripcion, resumen, id_empleado) FROM stdin;
    public               postgres    false    222   j       �          0    16390    usuarios 
   TABLE DATA           :   COPY public.usuarios (id, username, password) FROM stdin;
    public               postgres    false    218   �                  0    0    empleados_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.empleados_id_seq', 4, true);
          public               postgres    false    219                       0    0    solicitudes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.solicitudes_id_seq', 2, true);
          public               postgres    false    221                       0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);
          public               postgres    false    217            e           2606    16424 '   usuarios UQ_9f78cfde576fc28f279e2b7a9cb 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE (username);
 S   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb";
       public                 postgres    false    218            i           2606    16404    empleados empleados_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.empleados DROP CONSTRAINT empleados_pkey;
       public                 postgres    false    220            k           2606    16413    solicitudes solicitudes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.solicitudes DROP CONSTRAINT solicitudes_pkey;
       public                 postgres    false    222            g           2606    16395    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            l           2606    16425 *   solicitudes FK_9c8444bd6d8fd724c478eb27f68    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT "FK_9c8444bd6d8fd724c478eb27f68" FOREIGN KEY (id_empleado) REFERENCES public.empleados(id);
 V   ALTER TABLE ONLY public.solicitudes DROP CONSTRAINT "FK_9c8444bd6d8fd724c478eb27f68";
       public               postgres    false    220    4713    222               �   x�3�4202�50"N���<���+�R�8�L@@�������P�؀�5'31/Q!(17����n��!g@bIQfrf��[jQ^b^
P�9B�	�D#]K��Ԥ����
��y%E�E�Ŝ�`�1z\\\ ��)�         `   x�3����500����L�,)MQHIU(KLNL���K-F/H-��Oɇ�'�(�prA2B�����X T����SB!'1)�(1�ӈ+F��� R/�      �   [   x�3�tL������KM.I40�T1JR14Pɨ*��5u�/22-���L
��K�3�I�45K+�0*��M�t���pOO4-s	���Nr����� 5�	     