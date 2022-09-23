<?php

class Membre
{

    /**
     * @param string $nom
     * @param string $url
     * @param string $logo
     * @param bool $actif
     * @return bool
     */
    public static function ajouter(string $nom, string $url, string $logo, bool $actif): bool
    {
        $ok = false;
        $sql = <<<EOD
            Select id
            From lien
            Where nom = :nom
EOD;
        $db = Database::getInstance();
        $curseur = $db->prepare($sql);
        $curseur->bindParam('nom', $nom);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        if ($ligne)
            $reponse = "Ce membre existe déjà";

        // ajout dans la table membre, le mot de passe par défaut est 0000
        $sql = <<<EOD
        insert into lien(nom, url, logo, actif)
        values (:nom, :url, :logo, :actif);
EOD;
        $curseur = $db->prepare($sql);
        $curseur->bindParam('nom', $nom);
        $curseur->bindParam('url', $url);
        $curseur->bindParam('logo', $logo);
        $curseur->bindParam('actif', $actif);
        try {
            $curseur->execute();
            $ok = true;
        } catch (Exception $e) {
            $reponse = substr($e->getMessage(), strrpos($e->getMessage(), '#') + 1);
        }
    }
return $ok;
}