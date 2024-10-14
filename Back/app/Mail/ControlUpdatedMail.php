<?php

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ControlUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $controle;
    public $recipient;

    public function __construct($controle, $recipient)
    {
        $this->controle = $controle;
        $this->recipient = $recipient;
    }

    public function build()
    {
        return $this->markdown('emails.control_updated')
                    ->with([
                        'controleId' => $this->controle->id,
                        'controleDescription' => $this->controle->descriptif,
                        'recipientName' => $this->recipient->name,
                        'updatedBy' => Auth::user()->name, // Nom de l'utilisateur qui a fait la mise à jour
                    ]);
    }
}

