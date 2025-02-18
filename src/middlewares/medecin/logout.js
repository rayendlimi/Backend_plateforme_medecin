router.post('/logout', async (req, res) => {
    try {
      // Renvoyer une réponse de succès
      res.status(200).send({ message: "Déconnexion réussie" });
    } catch (error) {
      res.status(500).send({ message: "Erreur lors de la déconnexion" });
    }
  });