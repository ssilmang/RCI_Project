<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControleController;
use App\Http\Controllers\UtilisateurController;

Route::middleware('auth:api')->get('/user', function(Request $request) {
    return $request->user(); // Retourne l'utilisateur connecté
});

// Définition de la route pour récupérer tous les utilisateurs
Route::get('/utilisateur/all', [UtilisateurController::class, 'index']);
Route::post('/utilisateur/create', [UtilisateurController::class, 'store']);
Route::put('/utilisateur/update/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateur/delete/{id}', [UtilisateurController::class, 'destroy']);
//routers for controles
Route::get('/controle/all', [ControleController::class, 'index']);
Route::post('/controle/create', [ControleController::class, 'store']);
// Route::put('/controle/update', [ControleController::class, 'store']);
Route::put('/controle/update/{id}', [ControleController::class, 'update']);
Route::delete('/controle/delete/{id}', [ControleController::class, 'destroy']);
//routes for poles//
