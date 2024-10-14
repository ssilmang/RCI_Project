<x-mail::message>
# Mise à jour de Contrôle

Cher(e) {{ $recipientName }},

Nous vous informons que le contrôle avec l'ID **#{{ $controleId }}** a été mis à jour. Voici les détails :

- **Description du contrôle :** {{ $controleDescription }}
- **Mis à jour par :** {{ $updatedBy }}

Vous pouvez consulter les détails complets du contrôle dans notre application.

<x-mail::button :url="$detailsUrl">
Consulter le contrôle
</x-mail::button>
<p>Cordialement,</p>
<p>L'équipe de gestion des contrôles Interne (RCI)</p>
{{ config('app.name') }}
</x-mail::message>
