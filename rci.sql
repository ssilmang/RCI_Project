-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 25 juin 2024 à 18:04
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rci`
--

-- --------------------------------------------------------

--
-- Structure de la table `activites`
--

CREATE TABLE `activites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activites`
--

INSERT INTO `activites` (`id`, `libelle`, `service_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'A1', 1, '2024-06-24 15:45:43', '2024-06-24 15:45:43', NULL),
(2, 'A2', 2, '2024-06-24 15:45:49', '2024-06-24 15:45:49', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `controles`
--

CREATE TABLE `controles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `activite_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `departement_id` bigint(20) UNSIGNED NOT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `risque_id` bigint(20) UNSIGNED NOT NULL,
  `pole_id` bigint(20) UNSIGNED NOT NULL,
  `data_id` bigint(20) UNSIGNED NOT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `periodicite` varchar(255) NOT NULL,
  `exhaustivite` varchar(255) NOT NULL,
  `preuve` varchar(255) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `date_ajout` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  `validate` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `fichier` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `controles`
--

INSERT INTO `controles` (`id`, `user_id`, `activite_id`, `service_id`, `departement_id`, `direction_id`, `risque_id`, `pole_id`, `data_id`, `etat`, `periodicite`, `exhaustivite`, `preuve`, `commentaire`, `date_ajout`, `archived_at`, `validate`, `deleted_at`, `fichier`, `created_at`, `updated_at`) VALUES
(4, 1, 1, 1, 1, 1, 1, 1, 1, 'Applicable', 'saisir la périodicité', 'Exhaustivité', 'P1', 'C1', '2025-06-25 11:43:37', NULL, 'Non validé', NULL, '[\"fichiers\\/9qwIDXCEr63Bt089ovR9AELWcgYobviPt5kG9Shu.jpg\",\"fichiers\\/7loYrVdIV5U0oygAYuFIolfthNkRqQTqPG0kLMux.xlsx\",\"fichiers\\/H9NS7kvPjc1kKr4J3QmKoT245z2hYarZFn1oe7al.xlsx\",\"fichiers\\/G4sZ5GKs6Wgcks9D75k2t88cuV6bHfZvjQbHCwfP.xlsx\"]', '2024-06-25 11:43:37', '2024-06-25 12:09:10'),
(5, 2, 1, 1, 1, 1, 1, 1, 2, 'Applicable', 'annuelle', 'Exhaustivité', 'P1', 'C1', '2024-06-25 12:15:19', NULL, 'Non validé', NULL, '[\"fichiers\\/WYUz0PUMd7lmIOAqvoItaA9odgp6Ii9rYaDzriKJ.xlsx\",\"fichiers\\/3BtFSuuuD6da2POd3Pth98eDowP53y2CsXp0N8ZV.xlsx\"]', '2024-06-25 12:15:19', '2024-06-25 12:15:19'),
(6, 2, 1, 1, 1, 1, 3, 1, 3, 'Non fait', 'mensuelle', 'Non exhaustivité', 'P1', 'C1', '2024-06-25 12:15:52', NULL, 'Non validé', NULL, '[\"fichiers\\/c4A2qLSkwRh7hzLlb3ee9stx2apSNLXrE7DRg96U.jpg\",\"fichiers\\/Um8ykvLp4Oa1socGaN8T7Kwso0R5EMSj8JTdnZMe.png\"]', '2024-06-25 12:15:52', '2024-06-25 12:15:52'),
(7, 2, 1, 1, 1, 1, 3, 1, 3, 'Fait', 'mensuelle', 'Non exhaustivité', 'P1', 'C1', '2024-06-25 12:21:56', NULL, 'Non validé', NULL, '[\"fichiers\\/CeX9sYFePrg3WfEOvFNeCEHP5DcSjEQMoPeC7QqC.jpg\",\"fichiers\\/qZGxCUGYLIAhHayw889VGllqzz01s0D8H0PfA41D.png\"]', '2024-06-25 12:21:56', '2024-06-25 12:21:56'),
(8, 1, 1, 1, 1, 1, 2, 1, 1, 'Fait', 'saisir la périodicité', 'Non exhaustivité', 'P1', 'C1', '2024-06-25 12:25:48', NULL, 'Non validé', NULL, '[\"fichiers\\/kNjdgvU49pxwhZlwBPUMnATxgjdA1sxLSJUtehE1.xlsx\"]', '2024-06-25 12:25:48', '2024-06-25 12:25:48'),
(9, 1, 1, 1, 1, 1, 2, 1, 1, 'Applicable', 'saisir la périodicité', 'Exhaustivité', 'P1', 'wop', '2024-06-25 12:29:04', NULL, 'Non validé', NULL, '[\"fichiers\\/xX2cbbhULZP1CIaxKOIwjyQmWgc2U9a8Mr8wjYTC.xlsx\"]', '2024-06-25 12:29:04', '2024-06-25 12:29:04'),
(10, 1, 1, 1, 1, 1, 2, 1, 1, 'Applicable', 'saisir la périodicité', 'Non exhaustivité', 'P1', 'wop', '2024-06-25 12:29:24', NULL, 'Non validé', NULL, '[\"fichiers\\/cgJhtpbJ2JAwR3kV7RUEGf4jmomOIQgEjh4fViZ6.xlsx\"]', '2024-06-25 12:29:24', '2024-06-25 12:29:24'),
(11, 1, 1, 1, 1, 1, 2, 1, 2, 'Applicable', 'saisir la périodicité', 'Non exhaustivité', 'P1', 'C1', '2024-06-25 12:30:23', NULL, 'Non validé', NULL, '[]', '2024-06-25 12:30:24', '2024-06-25 12:30:24');

-- --------------------------------------------------------

--
-- Structure de la table `contrys`
--

CREATE TABLE `contrys` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contrys`
--

INSERT INTO `contrys` (`id`, `libelle`, `updated_at`, `created_at`, `deleted_at`) VALUES
(1, 'Sénégal', '2024-06-24 15:43:06', '2024-06-24 15:43:06', NULL),
(2, 'Mali', '2024-06-24 15:43:10', '2024-06-24 15:43:10', NULL),
(3, 'Guinée Conakry', '2024-06-24 15:43:17', '2024-06-24 15:43:17', NULL),
(4, 'Guinée Bissau', '2024-06-24 15:43:21', '2024-06-24 15:43:21', NULL),
(5, 'Sierra Leone', '2024-06-24 15:43:26', '2024-06-24 15:43:26', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

CREATE TABLE `data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_controle` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `objectif` varchar(255) NOT NULL,
  `descriptif` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `type_controle_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `data`
--

INSERT INTO `data` (`id`, `nom_controle`, `code`, `objectif`, `descriptif`, `deleted_at`, `type_controle_id`, `created_at`, `updated_at`) VALUES
(1, 'Controle 1', 'Code 1', 'Objectif 1', 'Descriptif 1', NULL, 1, '2024-06-24 15:53:21', '2024-06-24 15:53:21'),
(2, 'Controle 2', 'Code 2', 'Objectif 2', 'Descriptif 2', NULL, 2, '2024-06-24 15:53:47', '2024-06-24 15:55:27'),
(3, 'Controle 3', 'Code 3', 'Objectif 3', 'Descriptif 3', NULL, 3, '2024-06-24 15:55:53', '2024-06-25 11:16:00'),
(4, 'Controle 4', 'Code 4', 'Objectif 4', 'Descriptif 4', NULL, 4, '2024-06-25 10:45:42', '2024-06-25 11:16:05');

-- --------------------------------------------------------

--
-- Structure de la table `departements`
--

CREATE TABLE `departements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `pole_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `departements`
--

INSERT INTO `departements` (`id`, `libelle`, `direction_id`, `pole_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Dept 1', 1, 1, '2024-06-24 15:45:19', '2024-06-24 15:45:19', NULL),
(2, 'Dept 2', 2, 2, '2024-06-24 15:45:27', '2024-06-24 15:45:27', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `directions`
--

CREATE TABLE `directions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `directions`
--

INSERT INTO `directions` (`id`, `libelle`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'D1', '2024-06-24 15:44:44', '2024-06-24 15:44:44', NULL),
(2, 'D2', '2024-06-24 15:44:47', '2024-06-24 15:44:47', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2024_04_07_092710_typecontrole', 1),
(4, '2024_04_07_100242_contry', 1),
(5, '2024_04_29_113103_risque', 1),
(6, '2024_04_30_183822_create_directions_table', 1),
(7, '2024_04_30_183840_create_poles_table', 1),
(8, '2024_04_30_183910_create_departements_table', 1),
(9, '2024_04_30_183931_create_services_table', 1),
(10, '2024_04_30_183959_create_activites_table', 1),
(11, '2024_04_30_184146_create_data_table', 1),
(12, '2024_04_30_184147_create_users_table', 1),
(13, '2024_04_30_184148_create_controle_table', 1),
(14, '2024_06_25_121337_change_fichier_column_in_controles_table', 2);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poles`
--

CREATE TABLE `poles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `poles`
--

INSERT INTO `poles` (`id`, `libelle`, `direction_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Pole 1', 1, '2024-06-24 15:44:55', '2024-06-24 15:44:55', NULL),
(2, 'Pole 2', 2, '2024-06-24 15:45:01', '2024-06-24 15:45:01', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `risques`
--

CREATE TABLE `risques` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `risques`
--

INSERT INTO `risques` (`id`, `libelle`, `updated_at`, `created_at`, `deleted_at`) VALUES
(1, 'Risque 1', '2024-06-24 15:46:23', '2024-06-24 15:46:01', NULL),
(2, 'Risque 2', '2024-06-24 15:46:05', '2024-06-24 15:46:05', NULL),
(3, 'Risque 3', '2024-06-24 15:46:08', '2024-06-24 15:46:08', NULL),
(4, 'Risque 4', '2024-06-24 15:46:12', '2024-06-24 15:46:12', NULL),
(5, 'Risque 5', '2024-06-24 15:46:17', '2024-06-24 15:46:17', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `departement_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `libelle`, `departement_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'S1', 1, '2024-06-24 15:45:34', '2024-06-24 15:45:34', NULL),
(2, 'S2', 2, '2024-06-24 15:45:38', '2024-06-24 15:45:38', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `type_controles`
--

CREATE TABLE `type_controles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_controles`
--

INSERT INTO `type_controles` (`id`, `libelle`, `updated_at`, `created_at`, `deleted_at`) VALUES
(1, 'Type 1', '2024-06-24 15:44:08', '2024-06-24 15:43:36', NULL),
(2, 'Type 2', '2024-06-24 15:43:40', '2024-06-24 15:43:40', NULL),
(3, 'Type 3', '2024-06-24 15:43:45', '2024-06-24 15:43:45', NULL),
(4, 'Type 4', '2024-06-24 15:43:49', '2024-06-24 15:43:49', NULL),
(5, 'Type 5', '2024-06-24 15:43:53', '2024-06-24 15:43:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_complet` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `addresse` varchar(255) DEFAULT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `pays_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom_complet`, `email`, `matricule`, `photo`, `telephone`, `addresse`, `direction_id`, `service_id`, `pays_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Elhadji Malick Ndao', 'ndaoelhadji973@gmail.com', '17UUD', NULL, '783845870', 'Grand Yoff', 1, 1, 1, NULL, '$2y$12$gQR6HEE4FWjF3G3qv1Nu4eZym.RiAasmzyrO0IZ7OOj9.teMprUsO', NULL, '2024-06-24 16:08:59', '2024-06-24 16:08:59', NULL),
(2, 'Sadio Faye', 'sadio@gmail.com', 'HUE78', NULL, '78399', 'Golf', 1, 2, 2, NULL, '$2y$12$zjJ48XVkhfwk.bSPlsb6TO3wxSzs5DxMz38jNrtCYcNiaIlPotMXe', NULL, '2024-06-24 16:09:36', '2024-06-24 16:09:36', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activites`
--
ALTER TABLE `activites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activites_service_id_foreign` (`service_id`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `controles`
--
ALTER TABLE `controles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `controles_user_id_foreign` (`user_id`),
  ADD KEY `controles_activite_id_foreign` (`activite_id`),
  ADD KEY `controles_service_id_foreign` (`service_id`),
  ADD KEY `controles_departement_id_foreign` (`departement_id`),
  ADD KEY `controles_direction_id_foreign` (`direction_id`),
  ADD KEY `controles_risque_id_foreign` (`risque_id`),
  ADD KEY `controles_pole_id_foreign` (`pole_id`),
  ADD KEY `controles_data_id_foreign` (`data_id`);

--
-- Index pour la table `contrys`
--
ALTER TABLE `contrys`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data_type_controle_id_foreign` (`type_controle_id`);

--
-- Index pour la table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departements_direction_id_foreign` (`direction_id`),
  ADD KEY `departements_pole_id_foreign` (`pole_id`);

--
-- Index pour la table `directions`
--
ALTER TABLE `directions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `poles`
--
ALTER TABLE `poles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poles_direction_id_foreign` (`direction_id`);

--
-- Index pour la table `risques`
--
ALTER TABLE `risques`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_departement_id_foreign` (`departement_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `type_controles`
--
ALTER TABLE `type_controles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_matricule_unique` (`matricule`),
  ADD KEY `users_direction_id_foreign` (`direction_id`),
  ADD KEY `users_service_id_foreign` (`service_id`),
  ADD KEY `users_pays_id_foreign` (`pays_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activites`
--
ALTER TABLE `activites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `controles`
--
ALTER TABLE `controles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `contrys`
--
ALTER TABLE `contrys`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `data`
--
ALTER TABLE `data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `directions`
--
ALTER TABLE `directions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `poles`
--
ALTER TABLE `poles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `risques`
--
ALTER TABLE `risques`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `type_controles`
--
ALTER TABLE `type_controles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activites`
--
ALTER TABLE `activites`
  ADD CONSTRAINT `activites_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Contraintes pour la table `controles`
--
ALTER TABLE `controles`
  ADD CONSTRAINT `controles_activite_id_foreign` FOREIGN KEY (`activite_id`) REFERENCES `activites` (`id`),
  ADD CONSTRAINT `controles_data_id_foreign` FOREIGN KEY (`data_id`) REFERENCES `data` (`id`),
  ADD CONSTRAINT `controles_departement_id_foreign` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`),
  ADD CONSTRAINT `controles_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `controles_pole_id_foreign` FOREIGN KEY (`pole_id`) REFERENCES `poles` (`id`),
  ADD CONSTRAINT `controles_risque_id_foreign` FOREIGN KEY (`risque_id`) REFERENCES `risques` (`id`),
  ADD CONSTRAINT `controles_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `controles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_type_controle_id_foreign` FOREIGN KEY (`type_controle_id`) REFERENCES `type_controles` (`id`);

--
-- Contraintes pour la table `departements`
--
ALTER TABLE `departements`
  ADD CONSTRAINT `departements_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `departements_pole_id_foreign` FOREIGN KEY (`pole_id`) REFERENCES `poles` (`id`);

--
-- Contraintes pour la table `poles`
--
ALTER TABLE `poles`
  ADD CONSTRAINT `poles_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`);

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_departement_id_foreign` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `users_pays_id_foreign` FOREIGN KEY (`pays_id`) REFERENCES `contrys` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
