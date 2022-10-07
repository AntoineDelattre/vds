<?php

class lien
{

    /**
     * @param string $nom
     * @param string $url
     * @param string $logo
     * @param bool $actif
     * @param string $reponse
     * @return bool
     */
    public static function ajouter(string $nom, string $url, string $logo, bool $actif, string &$reponse): bool
    {
        $ok = false;
        $sql = <<<EOD
            Select id
            From lien
            Where logo = :logo
            and url = :url
EOD;
        $db = Database::getInstance();
        $curseur = $db->prepare($sql);
        $curseur->bindParam('logo', $logo);
        $curseur->bindParam('url', $url);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        if ($ligne)
            $reponse = "Ce membre existe déjà";
        else {
            // ajout dans la table lien
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
}