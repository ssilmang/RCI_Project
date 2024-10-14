<?php

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ControleUpdated extends Mailable
{
    use Queueable, SerializesModels;

    protected $pilotage;

    public function __construct($pilotage)
    {
        $this->pilotage = $pilotage;
    }

    public function build()
    {
        return $this->view('emails.control_updated')
                    ->with([
                        'pilotage' => $this->pilotage,
                    ])
                    ->subject('Mise à jour d\'un contrôle');
                
    }
}

