<?php

namespace App\Providers;

use App\Models\Activite;
use App\Models\Controle;
use App\Models\Contry;
use App\Models\Departement;
use App\Models\Direction;
use App\Models\Pole;
use App\Models\Profil;
use App\Models\Risque;
use App\Models\Service;
use App\Models\TypeControle;
use App\Models\User;
use App\Policies\ActivitePolicy;
use App\Policies\ControlePolicy;
use App\Policies\ContryPolicy;
use App\Policies\DepartementPolicy;
use App\Policies\DirectionPolicy;
use App\Policies\PolePolicy;
use App\Policies\ProfilPolicy;
use App\Policies\RisquePolicy;
use App\Policies\ServicePolicy;
use App\Policies\TypeControlePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Contry::class => ContryPolicy::class,
        Activite::class => ActivitePolicy::class,
        Controle::class => ControlePolicy::class,
        Departement::class => DepartementPolicy::class,
        Direction::class => DirectionPolicy::class,
        Pole::class => PolePolicy::class,
        Profil::class => ProfilPolicy::class,
        Risque::class => RisquePolicy::class,
        Service::class => ServicePolicy::class,
        TypeControle::class => TypeControlePolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot()
    {
        $this->registerPolicies();

        // You can define your policies here
        // For example:
        // Gate::define('view-dashboard', function ($user) {
        //     return $user->isAdmin();
        // });
    }
}
