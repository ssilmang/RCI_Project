<?php
namespace App\Services;
use App\Models\Notification;
use App\Models\User;
class NotificationService
{
    public function sendNotification(User $user,$message){
        Notification::create([
       'user_id'=>$user->id,
       'message'=>$message

        ]);
    }
}