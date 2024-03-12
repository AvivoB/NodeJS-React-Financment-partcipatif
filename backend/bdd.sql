--
-- Structure de la table `cagnotte`
--

CREATE TABLE `cagnotte` (
  `ID` int(11) NOT NULL,
  `NOM` varchar(255) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `OBJECTIF` int(11) NOT NULL,
  `ETAT` varchar(255) NOT NULL,
  `IMAGE_URL` varchar(255) DEFAULT NULL,
  `DATEDEBUT` date DEFAULT NULL,
  `DATEFIN` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `ID` int(11) NOT NULL,
  `IDUSER` int(11) DEFAULT NULL,
  `IDCAGNOTTE` int(11) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `COMMENTAIRE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `ID` int(11) NOT NULL,
  `IDCAGNOTTE` int(11) DEFAULT NULL,
  `IDUSER` int(11) DEFAULT NULL,
  `DATE_TIMESTAMP` date DEFAULT NULL,
  `PAIEMENT_TYPE` varchar(50) DEFAULT NULL,
  `STATUT_PAIEMENT` varchar(15) NOT NULL,
  `AMOUNT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `ID` int(11) NOT NULL,
  `PSEUDO` varchar(255) NOT NULL,
  `NOM` varchar(255) NOT NULL,
  `PRENOM` varchar(255) NOT NULL,
  `BIRTHDAY` date DEFAULT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `TEL` int(11) DEFAULT NULL,
  `ADRESS` varchar(255) DEFAULT NULL,
  `CP` varchar(10) DEFAULT NULL,
  `VILLE` varchar(255) DEFAULT NULL,
  `NUMADRESSE` int(11) DEFAULT NULL,
  `GENRE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cagnotte`
--
ALTER TABLE `cagnotte`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUSER` (`IDUSER`),
  ADD KEY `IDCAGNOTTE` (`IDCAGNOTTE`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDCAGNOTTE` (`IDCAGNOTTE`),
  ADD KEY `IDUSER` (`IDUSER`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `PSEUDO` (`PSEUDO`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cagnotte`
--
ALTER TABLE `cagnotte`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `participation`
--
ALTER TABLE `participation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`IDUSER`) REFERENCES `utilisateur` (`ID`),
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`IDCAGNOTTE`) REFERENCES `cagnotte` (`ID`);

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`IDCAGNOTTE`) REFERENCES `cagnotte` (`ID`),
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`IDUSER`) REFERENCES `utilisateur` (`ID`);
COMMIT;