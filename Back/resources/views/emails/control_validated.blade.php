<!DOCTYPE html>
<html>
<head>
    <title>Validation d'un contrôle</title>
</head>
<body>
    <p>Bonjour,</p>
    <p>Le contrôle suivant a été validé :</p>
    <ul>
        <li>Code : {{ $pilotage->code }}</li>
        <li>Descriptif : {{ $pilotage->descriptif }}</li>
        <!-- Ajoutez d'autres détails selon vos besoins -->
    </ul>
    <p>Cordialement,</p>
    <p>L'équipe de gestion des contrôles interne (RCI)</p>
</body>
</html>
