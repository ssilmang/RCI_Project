-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 06 juin 2024 à 12:44
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
(1, 'A1', 1, '2024-06-03 12:27:47', '2024-06-03 12:27:47', NULL),
(2, 'A2', 1, '2024-06-03 12:27:54', '2024-06-03 12:27:54', NULL);

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
  `objectif` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `activite_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `departement_id` bigint(20) UNSIGNED NOT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `periodicite` varchar(255) NOT NULL,
  `exhaustivite` varchar(255) NOT NULL,
  `preuve` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `descriptif` varchar(255) NOT NULL,
  `date_ajout` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fichier` blob DEFAULT NULL,
  `risque_id` bigint(20) UNSIGNED NOT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `pole_id` bigint(20) UNSIGNED NOT NULL,
  `validate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `controles`
--

INSERT INTO `controles` (`id`, `objectif`, `user_id`, `activite_id`, `service_id`, `departement_id`, `direction_id`, `periodicite`, `exhaustivite`, `preuve`, `nom`, `code`, `commentaire`, `descriptif`, `date_ajout`, `archived_at`, `deleted_at`, `created_at`, `updated_at`, `fichier`, `risque_id`, `etat`, `pole_id`, `validate`) VALUES
(7, 'test', 1, 1, 1, 1, 1, 'annuelle', 'Exhaustivité', 'preuve de tous', 'Control 1', '8', 'bismillah', 'desccc', '2024-06-05 10:23:36', NULL, NULL, '2024-06-05 10:23:36', '2024-06-06 10:41:38', 0x66696368696572732f37703154514735435a4b324c463272795a6564457461655167457a7364524b52327638414969514d2e706466, 1, 'Fait', 1, 'Non validé'),
(8, 'test', 1, 1, 1, 1, 2, 'annuelle', 'Exhaustivité', 'preuve de tous mounan', 'Control 1', '8', 'bismillah', 'desccc', '2024-06-05 10:35:10', NULL, NULL, '2024-06-05 10:35:10', '2024-06-06 09:43:35', 0x66696368696572732f54346c34574f3832447441323371613733343764466a67426d4b4951734d374165413556594365452e646f6378, 1, 'Non fait', 1, 'Non validé'),
(9, 'test', 1, 1, 1, 1, 2, 'annuelle', 'Exhaustivité', 'preuve de tous mounan', 'Control 1', '8', 'bismillah', 'desccc', '2024-06-05 10:35:57', '2024-06-05 12:42:15', NULL, '2024-06-05 10:35:57', '2024-06-05 16:47:16', 0x66696368696572732f714676444636545969786e4d6a7356673041744b526355367671795361536c353531506d624952752e747874, 1, 'Non fait', 1, 'Validé'),
(10, 'O1', 1, 1, 1, 1, 1, 'Annuelle', 'Exhaustivité', 'P1', 'Control 1', 'Code 1', 'C1', 'D1', '2024-06-05 10:49:05', NULL, NULL, '2024-06-05 10:49:05', '2024-06-06 10:25:25', 0x66696368696572732f6a4d6f526d5336547963714e54694e794939754568337a724f6f4965635a487945367a346e6b49472e706466, 3, 'Applicable', 1, 'Validé'),
(11, 'O1', 1, 1, 1, 1, 1, 'Annuelle', 'Non exhaustivité', 'P1', 'Control 1', 'Code 1', 'C1', 'D1', '2024-06-05 10:49:53', NULL, NULL, '2024-06-05 10:49:53', '2024-06-06 09:22:58', 0x66696368696572732f4f3357627066487a38433641584d6546356e6d6e3355704c4452366c5556587a70353566495958332e786c7378, 1, 'Fait', 1, 'Non validé'),
(12, 'O1', 1, 1, 1, 1, 1, 'Annuelle', 'Non exhaustivité', 'P1', 'Control 1', 'Code 1', 'C1', 'D1', '2024-06-05 10:51:00', '2024-06-06 08:14:49', NULL, '2024-06-05 10:51:00', '2024-06-06 08:17:05', 0x66696368696572732f4a527a4b4b6f756b3767795154534d455548466c5436496d37466e666c797141776746334c7550552e786c7378, 1, 'Non fait', 1, 'Non validé'),
(13, 'test', 1, 1, 1, 1, 1, 'annuelle', 'Exhaustivité', 'preuve de tous mounan', 'Control 2', '8', 'bismillah', 'desccc', '2024-06-05 13:30:16', NULL, NULL, '2024-06-05 13:30:16', '2024-06-05 13:30:16', 0x66696368696572732f6b6b4745754465646c796b7776707468317952614e41385063757831794c6947626e7333774b674c2e706466, 3, 'Fait', 1, 'Non validé');

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
(1, 'Dept 1', 1, 1, '2024-06-03 12:27:08', '2024-06-03 12:27:08', NULL),
(2, 'Dept 2', 1, 2, '2024-06-03 12:27:21', '2024-06-03 12:27:21', NULL);

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
(1, 'D1', '2024-06-03 12:26:06', '2024-06-03 12:26:48', NULL),
(2, 'D2', '2024-06-03 12:26:12', '2024-06-03 12:26:12', NULL),
(3, 'D3', '2024-06-03 12:26:17', '2024-06-03 12:26:17', NULL);

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
(3, '2024_04_30_183822_create_directions_table', 1),
(4, '2024_04_30_183840_create_poles_table', 1),
(5, '2024_04_30_183910_create_departements_table', 1),
(6, '2024_04_30_183931_create_services_table', 1),
(7, '2024_04_30_183959_create_activites_table', 1),
(8, '2024_04_30_184147_create_users_table', 1),
(9, '2024_04_30_184148_create_controle_table', 1),
(10, '2024_05_13_153652_add_phone_number_to_users_table', 1),
(11, '2024_05_14_102623_add_fichier_to_pilotage_table', 1),
(12, '2024_05_14_102624_update_fichier_nullable_in_pilotages_table', 1),
(13, '2024_05_23_113103_risque', 1),
(14, '2024_06_03_124311_add_deleted_at_to_risque_table', 2),
(15, '2024_06_03_131501_modify_controles_table', 3),
(16, '2024_06_03_131853_modify_controles_table', 4),
(17, '2024_06_03_132928_modify_controles_table', 5),
(18, '2024_06_03_133517_modify_validate_enum_values_in_controles_table', 6),
(19, '2024_06_03_133714_modify_validate_enum_values_in_controles_table', 7),
(20, '2024_06_03_133805_modify_validate_enum_values_in_controles_table', 8),
(21, '2024_06_03_133945_modify_validate_enum_values_in_controles_table', 9),
(22, '2024_06_03_134558_modify_validate_enum_values_in_controles_table', 10),
(23, '2024_06_03_150638_modify_validate_enum_values_in_controles_table', 11),
(24, '2024_06_03_150710_modify_validate_enum_values_in_controles_table', 12);

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
(1, 'Pole 1', 1, '2024-06-03 12:26:24', '2024-06-03 12:26:24', NULL),
(2, 'Pole 2', 1, '2024-06-03 12:26:35', '2024-06-03 12:26:35', NULL);

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
(1, 'Risque 1', '2024-06-03 12:59:59', '2024-06-03 12:35:24', NULL),
(2, 'Risque 2', '2024-06-03 13:00:12', '2024-06-03 12:35:38', NULL),
(3, 'Risque 3', '2024-06-03 13:00:18', '2024-06-03 12:35:49', NULL),
(4, 'Risque 4', '2024-06-03 13:07:06', '2024-06-03 12:35:56', '2024-06-03 13:07:06'),
(5, 'Risque 4', '2024-06-04 13:19:16', '2024-06-04 13:19:16', NULL);

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
(1, 'S1', 1, '2024-06-03 12:27:31', '2024-06-03 12:27:31', NULL),
(2, 'S2', 1, '2024-06-03 12:27:38', '2024-06-03 12:27:38', NULL);

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
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_complet` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `addresse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom_complet`, `email`, `matricule`, `photo`, `direction_id`, `service_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`, `telephone`, `addresse`) VALUES
(1, 'Elhadji Malick Ndao', 'ndaoelhadji973@gmail.com', '17UUD', NULL, 1, 1, NULL, '$2y$12$YWm4N/Yd5E77QvCg/NggSeiHhxa8LtWuMPueJd4xtMuzYkTg38mry', NULL, '2024-06-03 12:28:21', '2024-06-03 12:28:21', NULL, '783845870', 'Grand Yoff'),
(2, 'Sadio Faye', 'sadio@gmail.com', '28jh', NULL, 1, 2, NULL, '$2y$12$TC6M/BPAJI9zf64TD.yyNOyoOrzfS5CkjhGojL3.v7lCO3DrwT8AG', NULL, '2024-06-03 12:28:55', '2024-06-03 12:28:55', NULL, '704859933', 'Golf');

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
  ADD KEY `controles_pole_id_foreign` (`pole_id`);

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
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_matricule_unique` (`matricule`),
  ADD KEY `users_direction_id_foreign` (`direction_id`),
  ADD KEY `users_service_id_foreign` (`service_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `directions`
--
ALTER TABLE `directions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  ADD CONSTRAINT `controles_departement_id_foreign` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`),
  ADD CONSTRAINT `controles_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `controles_pole_id_foreign` FOREIGN KEY (`pole_id`) REFERENCES `poles` (`id`),
  ADD CONSTRAINT `controles_risque_id_foreign` FOREIGN KEY (`risque_id`) REFERENCES `risques` (`id`),
  ADD CONSTRAINT `controles_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `controles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
  ADD CONSTRAINT `users_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
