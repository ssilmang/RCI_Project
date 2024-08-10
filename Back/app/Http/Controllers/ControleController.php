<?php

namespace App\Http\Controllers;

// use PDF;
use Exception;
use App\Models\User;
use App\Models\Contry;
use App\Models\Controle;
use Illuminate\Http\Request;
use App\Imports\ControleImport;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\DataResource;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Services\NotificationService;


class ControleController extends Controller
{
    protected $notificationService;
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Obtenir l'utilisateur authentifié
    $user = auth()->user();

    // Vérifier le profil de l'utilisateur
    if ($user->profil_id == 1) {
        // Si le profil_id de l'utilisateur est 1, retourner uniquement les contrôles associés à l'utilisateur
        $controles = Controle::where('user_id', $user->id)->with('type')->get();
        $archives = Controle::onlyTrashed()->where('user_id', $user->id)->with('type')->get();
    } else if ($user->profil_id == 2 || $user->profil_id == 3) {
        // Si le profil_id de l'utilisateur est 2 ou 3, retourner tous les contrôles
        $controles = Controle::with('type')->get();
        $archives = Controle::onlyTrashed()->with('type')->get();
    } else {
       
        $controles = collect(); 
        $archives = collect(); 
    }

    // Retourner les données sous forme JSON
    return response()->json([
        'controles' => DataResource::collection($controles),
        'archives' => DataResource::collection($archives)
    ]);
}

    
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return $request;

        try {
            $user = Auth::user();
        // return $user->id;
        // return $request->user_id;

            if ($request->user_id != $user->id) {
                return response()->json([
                  'error' => 'Le porteur choisi n\'est pas celui qui s\'est connecté !'
                ]);
            }
            if (!$request->direction_id || $request->direction_id ==null || $request->direction_id == 0) {
                return response()->json([
                  'error' => 'Veuillez choisir la direction!'
                ]);
            }
            if (!$request->preuve || $request->preuve == null) {
                return response()->json([
                    'error' => 'Veuillez renseigner la preuve demandée!'
                ]);
            }
            if (!$request->controle || empty($request->controle)) {
                return response()->json([
                    'error' => 'Veuillez saisir le controle!'
                ]);
            }
            if (!$request->code || empty($request->code)) {
                return response()->json([
                    'error' => 'Veuillez saisir le code du controle!'
                ]);
            }
            if (!$request->etat || $request->etat == 0) {
                return response()->json([
                    'error' => 'Veuillez renseigner le statut!'
                ]);
            }
            if (!$request->commentaire || empty($request->commentaire)) {
                return response()->json(['error' => 'Veuillez renseigner un commentaire!']);
            }
            if (!$request->exhaustivite || $request->exhaustivite==0) {
                return response()->json(['error' => 'Veuillez renseigner l\'exhaustivite!']);
            }

            // if ($request->hasFile('fichier')) {
            //     $filePath = $request->file('fichier')->store('fichiers', 'public');
            // }
            if ($request->etat == 'Fait') {
                if (!$request->hasFile('fichier')) {
                    return response()->json(['error' => 'Veuillez enregistrer le fichier de preuve!']);
                }
            }
            $filePaths = [];
            if ($request->hasFile('fichier')) {
                foreach ($request->file('fichier') as $file) {
                    $filePath = $file->store('fichiers', 'public');
                    $filePaths[] = $filePath;
                }
            }

            Controle::create([
                'controle' => $request->controle,
                'code' => $request->code,
                'descriptif' => $request->descriptif,
                'objectif' => $request->objectif,
                'type_controle_id' => $request->type,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'etat' => $request->etat,
                'commentaire' => $request->commentaire,
                'date_ajout' => now(),
                'risque_id' => $request->risque_id,
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
                'pole_id' => $request->pole_id,
                'activite_id' => $request->activite_id,
                'departement_id' => $request->departement_id,
                'user_id' => $request->user_id,
                'validate' => 'Non validé',
                // 'fichier' => $filePath
                'fichier' => json_encode($filePaths)
            ]);

            return response()->json([
                'message' => 'Contrôle créé avec succès!',
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue : ' . $th->getMessage(),
            ], 500);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id){
      try {
        $user = Auth::user();
        // return $user;
        // return $user->profil_id;
        // return $user->pays_id;

        $pilotage = Controle::find($id);
        $use = $pilotage->user_id;
        $pays = User::find($use);
        // return $pilotage;

        if ($user->profil_id == 3 && $user->pays_id != $pays->pays_id) {
            return response()->json([
                'error' => 'Vous ne pouvez editer que les controles de votre pays !'
            ]);
        }
        // return $pilotage->user_id;
        if ($user->profil_id == 1 && $user->id != $pilotage->user_id) {
            return response()->json([
               'error' => 'Vous ne pouvez editer que vos controles !'
            ]);
        }

        if (!$pilotage) {
            return response()->json(['error' => 'Controle non trouvé!'], 404);
        }

        if ($request->hasFile('fichier')) {
                // $filePath = $request->file('fichier')->store('fichiers', 'public');
            $filePaths = [];
            if ($request->hasFile('fichier')) {
                foreach ($request->file('fichier') as $file) {
                    $filePath = $file->store('fichiers', 'public');
                    $filePaths[] = $filePath;
                }
            }
            $pilotage->update([
                    'controle' => $request->controle,
                    'code' => $request->code,
                    'descriptif' => $request->descriptif,
                    'objectif' => $request->objectif,
                    'type_controle_id' => $request->type,
                    'periodicite' => $request->periodicite,
                    'exhaustivite' => $request->exhaustivite,
                    'preuve' => $request->preuve,
                    'etat' => $request->etat,
                    // 'fichier' => $filePath,
                    'fichier' => json_encode($filePaths),
                    'commentaire' => $request->commentaire,
                    'archived_at' => $request->archived_at,
                    'risque_id' => $request->risque_id,
                    'direction_id' => $request->direction_id,
                    'service_id' => $request->service_id,
                    'pole_id' => $request->pole_id,
                    'activite_id' => $request->activite_id,
                    'departement_id' => $request->departement_id,
                    'user_id' => $request->user_id,
            ]);
        }else{
            $pilotage->update([
                'controle' => $request->controle,
                'code' => $request->code,
                'descriptif' => $request->descriptif,
                'objectif' => $request->objectif,
                'type_controle_id' => $request->type,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'etat' => $request->etat,
                'commentaire' => $request->commentaire,
                'archived_at' => $request->archived_at,
                'risque_id' => $request->risque_id,
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
                'pole_id' => $request->pole_id,
                'activite_id' => $request->activite_id,
                'departement_id' => $request->departement_id,
                'user_id' => $request->user_id,
            ]);
        }

        return response()->json([
            'message' => 'Controle mise à jour avec succès!',
        ], 200);

      } catch (\Throwable $th) {
          return response()->json([
              'error' => 'Une erreur est survenue : ' . $th->getMessage(),
          ], 500);
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        // return $user;
        // return $user->profil_id;
        // return $user->pays_id;

        $pilotage = Controle::find($id);
        $use = $pilotage->user_id;
        $pays = User::find($use);
        // return $pilotage;

        if ($user->profil_id == 3 && $user->pays_id != $pays->pays_id) {
            return response()->json([
                'error' => 'Vous ne pouvez editer que les controles de votre pays !'
            ]);
        }

        if (!$pilotage) {
            return response()->json(['error' => 'Controle not found!'], 404);
        }
        $pilotage->update([
            'archived_at' => now()
        ]);

        $pilotage->delete();

        return response()->json(['message' => 'Controle deleted successfully!']);
    }

    public function restaurer($id)
    {
        $pilotage =Controle::onlyTrashed()->find($id);
        if ($pilotage) {
            $pilotage->restore();
            return response()->json([
                'message' => 'Le controle a été restauré avec succès!',
                'controle' => $pilotage
            ]);

        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

    public function validated($id)
    {
        $user = Auth::user();
        // return $user;
        // return $user->profil_id;
        // return $user->pays_id;

        $pilotage = Controle::find($id);
        $use = $pilotage->user_id;
        $pays = User::find($use);
        // return $pilotage;

        if ($user->profil_id == 3 && $user->pays_id != $pays->pays_id) {
            return response()->json([
                'error' => 'Vous ne pouvez valider que les controles de votre pays !'
            ]);
        }

        if ($pilotage) {
            $pilotage->validate = 'Validé';
            $pilotage->save();

            return response()->json([
                'message' => 'Le controle a été validé avec succès!',
                'controle' => $pilotage
            ]);

        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

    public function invalidated($id)
    {
        $user = Auth::user();
        // return $user;
        // return $user->profil_id;
        // return $user->pays_id;

        $pilotage = Controle::find($id);
        $use = $pilotage->user_id;
        $pays = User::find($use);
        // return $pilotage;

        if ($user->profil_id == 3 && $user->pays_id != $pays->pays_id) {
            return response()->json([
                'error' => 'Vous ne pouvez invalider que les controles de votre pays !'
            ]);
        }

        if ($pilotage) {
            $pilotage->validate = 'Non validé';
            $pilotage->save();

            return response()->json([
                'message' => 'Le controle a été validé avec succès!',
                'controle' => $pilotage
            ]);
        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

   

    public function import(Request $request)
    {
        try {

            $request->validate([

                'file' => 'required|mimes:xlsx,csv,txt',
            ]);

            Excel::import(new ControleImport, $request->file('file'));

            return response()->json(['success' => 'Importation réussie.']);

        } catch (Exception $e) {

            Log::error('Erreur lors de l\'importation : ' . $e->getMessage());

            return response()->json(['error' => 'Une erreur est survenue lors de l\'importation des contrôles.'], 500);
        }
    }

    public function getControlsGroupedByCountry()
{
    // Récupérer tous les pays avec leurs utilisateurs et contrôles
    $controlsGroupedByCountry = Contry::with(['users.controles'])->get()->map(function($country) {
        // Récupérer tous les contrôles pour le pays donné
        $allControls = $country->users->flatMap(function($user) {
            return $user->controles;
        });

        // Nombre total de contrôles pour le pays
        $totalControls = $allControls->count();
        
        // Calcul des pourcentages par état
        $controlsByStatus = $allControls->groupBy('etat')->mapWithKeys(function($controls, $status) use ($totalControls) {
            return [
                $status => [
                    'statut' => $status,
                    'count' => $controls->count(),
                    'percentage' => $totalControls > 0 ? ($controls->count() / $totalControls) * 100 : 0
                ]
            ];
        });

        // Calcul des pourcentages par état de validation
        $controlsByEtat = $allControls->groupBy('validate')->mapWithKeys(function($controls, $etat) use ($totalControls) {
            return [
                $etat => [
                    'etat' => $etat,
                    'count' => $controls->count(),
                    'percentage' => $totalControls > 0 ? ($controls->count() / $totalControls) * 100 : 0
                ]
            ];
        });

        return [
            'country' => $country->libelle,
            'control_count' => $totalControls,
            'controls_by_etat' => $controlsByEtat,
            'controls_by_status' => $controlsByStatus,
            'controls' => $allControls->map(function($controle) {
                return [
                    'id' => $controle->id,
                    'description' => $controle->description,
                    'etat' => $controle->etat,
                    'status' => $controle->status,
                    'type' => $controle->type_controle_id,
                ];
            }),
        ];
    });

    return response()->json($controlsGroupedByCountry);
}
    

    
    public function markAsRead($notificationId)
    {
        $notification = Notification::findOrFail($notificationId);
        $notification->read = true;
        $notification->save();
        return response()->json(['message' => 'Notification marquée comme lue']);
    }

    
    
    


    public function notif(Request $request, $controlId, $newEta, $newStatus)
{
    // Trouver le contrôle
    $control = Controle::find($controlId);
// dd($control);
    if (!$control) {
        throw new \Illuminate\Database\Eloquent\ModelNotFoundException("Contrôle non trouvé.");
    }

    // Trouver l'utilisateur associé au contrôle
    $user = $control->user;

    if (!$user) {
        throw new \Illuminate\Database\Eloquent\ModelNotFoundException("Utilisateur non trouvé.");
    }

    $paysId = $user->pays_id;
    $modifierId = $request->input('modifier_id'); // Assurez-vous que modifier_id est envoyé avec la requête

    $admin = User::where('profil_id', 3)
        ->where('pays_id', $paysId)
        ->get();

    $superAdmin = User::where('profil_id', 2)->get();

    // Mise à jour du contrôle
    $control->status = $newStatus;

    if ($newEta !== null) {
        $control->etat = $newEta;
    }

    $control->save();

    $notificationService = new NotificationService();
    $modifier = User::find($modifierId);

    // Notifier les administrateurs locaux et super administrateurs si le porteur change le statut
    if ($modifier && $modifier->profil_id == 4) { // Porteur
        foreach ($admin as $ad) {
            $notificationService->sendNotification($ad, "Le statut du contrôle #{$controlId} a été modifié par le porteur.");
        }

        foreach ($superAdmin as $supad) {
            $notificationService->sendNotification($supad, "Le statut du contrôle #{$controlId} a été modifié par le porteur.");
        }
    }

    // Notifier le porteur si un administrateur local valide le contrôle
    if ($modifier && $modifier->profil_id == 3) { // Administrateur local
        $porteur = $control->porteur; // Assurez-vous que cette relation est définie dans votre modèle
        if ($porteur) {
            $notificationService->sendNotification($porteur, "Votre contrôle #{$controlId} a été validé avec un nouvel état : {$newEta}.");
        }
    }

    // Notifier les administrateurs locaux et super administrateurs si validé par super administrateur
    if ($modifier && $modifier->profil_id == 2) { // Super administrateur
        foreach ($admin as $ad) {
            $notificationService->sendNotification($ad, "Le super administrateur a validé le contrôle #{$controlId} avec un nouvel état : {$newEta}.");
        }

        foreach ($superAdmin as $supad) {
            $notificationService->sendNotification($supad, "Le contrôle #{$controlId} a été validé avec un nouvel état : {$newEta} par un super administrateur.");
        }
    }

    return response()->json(['message' => 'Notifications envoyées et état du contrôle mis à jour.']);
}

public function getUserNotifications($userId)
    {
        $notifications = Notification::where('user_id', $userId)->get();
        return response()->json($notifications);
    }
    
    

}