-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 mai 2024 à 10:16
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
(1, 'Activité 1', 1, '2024-05-14 09:51:40', '2024-05-14 09:51:40', NULL),
(2, 'Activité 2', 1, '2024-05-14 09:51:48', '2024-05-14 09:51:48', NULL),
(3, 'Activité 3', 2, '2024-05-14 09:51:56', '2024-05-14 09:51:56', NULL);

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
  `nom` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `controles`
--

INSERT INTO `controles` (`id`, `nom`, `code`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Controle 1', 'C1', '2024-05-14 09:52:14', '2024-05-14 10:12:11', NULL),
(2, 'Controle 2', 'C2', '2024-05-14 09:52:20', '2024-05-14 09:53:00', '2024-05-14 09:53:00'),
(3, 'Controle 3', 'C3', '2024-05-14 09:52:31', '2024-05-14 09:52:31', NULL),
(4, 'Controle 4', 'C4', '2024-05-14 09:52:40', '2024-05-14 10:12:18', NULL),
(5, 'Controle 5', 'C5', '2024-05-14 09:52:48', '2024-05-14 10:12:22', NULL),
(6, 'Controle 6', 'C6', '2024-05-14 09:52:55', '2024-05-14 10:01:51', '2024-05-14 10:01:51');

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
(1, 'Departement 1', 1, 1, '2024-05-14 09:50:14', '2024-05-14 09:50:14', NULL),
(2, 'Departement 2', 1, 1, '2024-05-14 09:50:26', '2024-05-14 09:50:26', NULL),
(3, 'Departement 3', 2, 4, '2024-05-14 09:50:36', '2024-05-14 09:50:36', NULL);

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
(1, 'Direction 1', '2024-05-14 09:46:00', '2024-05-14 09:46:00', NULL),
(2, 'Direction 2', '2024-05-14 09:46:07', '2024-05-14 09:46:07', NULL),
(3, 'Direction 3', '2024-05-14 09:46:12', '2024-05-14 09:48:37', '2024-05-14 09:48:37');

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
(12, '0001_01_01_000001_create_cache_table', 1),
(13, '0001_01_01_000002_create_jobs_table', 1),
(14, '2024_04_30_183822_create_directions_table', 1),
(15, '2024_04_30_183840_create_poles_table', 1),
(16, '2024_04_30_183910_create_departements_table', 1),
(17, '2024_04_30_183931_create_services_table', 1),
(18, '2024_04_30_183959_create_activites_table', 1),
(19, '2024_04_30_184100_create_controles_table', 1),
(20, '2024_04_30_184147_create_users_table', 1),
(21, '2024_04_30_184148_create_pilotages_table', 1),
(22, '2024_05_13_153652_add_phone_number_to_users_table', 1),
(23, '2024_05_14_102624_update_fichier_nullable_in_pilotages_table', 2),
(24, '2024_05_14_134943_update_fichier_nullable_in_pilotages_table', 3);

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
-- Structure de la table `pilotages`
--

CREATE TABLE `pilotages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `controle_id` bigint(20) UNSIGNED NOT NULL,
  `objectif` varchar(255) NOT NULL,
  `risque_couvert` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `periodicite` varchar(255) NOT NULL,
  `exhaustivite` varchar(255) NOT NULL,
  `preuve` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `direction_id` bigint(20) UNSIGNED NOT NULL,
  `departement_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `activite_id` bigint(20) UNSIGNED NOT NULL,
  `pole_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pilotages`
--

INSERT INTO `pilotages` (`id`, `controle_id`, `objectif`, `risque_couvert`, `user_id`, `periodicite`, `exhaustivite`, `preuve`, `deleted_at`, `fichier`, `created_at`, `updated_at`, `direction_id`, `departement_id`, `service_id`, `activite_id`, `pole_id`, `code`, `etat`) VALUES
(3, 4, 'O1', 'R1', 1, 'saisir la périodicité', '1', 'P1', NULL, NULL, '2024-05-14 14:19:18', '2024-05-14 14:27:29', 1, 1, 1, 1, 1, 'C4', 0),
(4, 1, 'O2', 'R2', 2, 'P2', '2', 'P2', NULL, NULL, '2024-05-14 14:20:06', '2024-05-14 14:20:06', 2, 2, 2, 2, 2, 'C1', 0),
(5, 5, 'O5', 'R5', 1, 'P5', '1', 'P5', NULL, NULL, '2024-05-14 14:28:05', '2024-05-14 14:28:05', 1, 3, 3, 3, 3, 'C5', 0);

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
(1, 'Pole 1', 1, '2024-05-14 09:48:55', '2024-05-14 09:48:55', NULL),
(2, 'Pole 2', 1, '2024-05-14 09:49:03', '2024-05-14 09:49:03', NULL),
(3, 'Pole 3', 1, '2024-05-14 09:49:12', '2024-05-14 09:49:37', NULL),
(4, 'Pole 4', 2, '2024-05-14 09:49:21', '2024-05-14 09:49:21', NULL);

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
(1, 'Service 1', 1, '2024-05-14 09:50:49', '2024-05-14 09:50:49', NULL),
(2, 'Service 2', 1, '2024-05-14 09:50:59', '2024-05-14 09:50:59', NULL),
(3, 'Service 3', 2, '2024-05-14 09:51:09', '2024-05-14 09:51:09', NULL);

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
(1, 'Elhadji Malick Ndao', 'ndaoelhadji973@gmail.com', '17UUD', NULL, 1, 1, NULL, '$2y$12$QRy9n91vekjreX5cx9MJtumFaPzQvNEIhrN34XlgW84yrcAwVmsK2', NULL, '2024-05-14 09:53:29', '2024-05-14 09:53:29', NULL, '783845870', 'Grand Yoff'),
(2, 'Sadio Faye', 'sadio@gmail.com', 'AT67', NULL, 2, 2, NULL, '$2y$12$ejRbxyQhDacz5xG3lQz7euvYuSnjXV/YKbqNZuQXQejdO7m4RKXR6', NULL, '2024-05-14 09:53:56', '2024-05-14 09:53:56', NULL, '707453877', 'Golf');

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
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `pilotages`
--
ALTER TABLE `pilotages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pilotages_controle_id_foreign` (`controle_id`),
  ADD KEY `pilotages_user_id_foreign` (`user_id`),
  ADD KEY `pilotages_direction_id_foreign` (`direction_id`),
  ADD KEY `pilotages_departement_id_foreign` (`departement_id`),
  ADD KEY `pilotages_service_id_foreign` (`service_id`),
  ADD KEY `pilotages_activite_id_foreign` (`activite_id`),
  ADD KEY `pilotages_pole_id_foreign` (`pole_id`);

--
-- Index pour la table `poles`
--
ALTER TABLE `poles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poles_direction_id_foreign` (`direction_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `controles`
--
ALTER TABLE `controles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT pour la table `pilotages`
--
ALTER TABLE `pilotages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `poles`
--
ALTER TABLE `poles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Contraintes pour la table `departements`
--
ALTER TABLE `departements`
  ADD CONSTRAINT `departements_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `departements_pole_id_foreign` FOREIGN KEY (`pole_id`) REFERENCES `poles` (`id`);

--
-- Contraintes pour la table `pilotages`
--
ALTER TABLE `pilotages`
  ADD CONSTRAINT `pilotages_activite_id_foreign` FOREIGN KEY (`activite_id`) REFERENCES `activites` (`id`),
  ADD CONSTRAINT `pilotages_controle_id_foreign` FOREIGN KEY (`controle_id`) REFERENCES `controles` (`id`),
  ADD CONSTRAINT `pilotages_departement_id_foreign` FOREIGN KEY (`departement_id`) REFERENCES `departements` (`id`),
  ADD CONSTRAINT `pilotages_direction_id_foreign` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `pilotages_pole_id_foreign` FOREIGN KEY (`pole_id`) REFERENCES `poles` (`id`),
  ADD CONSTRAINT `pilotages_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `pilotages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
