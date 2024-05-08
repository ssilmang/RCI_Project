<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function map()
    {
        
        $this->mapApiRoutes(); // Charger les routes d'API
        //  $this->mapWebRoutes(); // Charger les routes Web
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api') 
            ->middleware('api') 
            ->group(base_path('routes/api.php'));
    }

   
}
