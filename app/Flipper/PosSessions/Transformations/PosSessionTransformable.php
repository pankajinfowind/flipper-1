<?php

namespace App\Flipper\PosSessions\Transformations;

use App\Flipper\PosSessions\PosSession;
use Illuminate\Support\Facades\Storage;

trait PosSessionTransformable
{
    /**
     * Transform the PosSession
     *
     * @param PosSession $session
     * @return PosSession
     */
    protected function transformPosSession(PosSession $session)
    {
        $sessionRepo = new PosSession;
        $sessionRepo->id = (int) $session->id;
        $sessionRepo->session = $session->session;
        $sessionRepo->open = $session->open;
        $sessionRepo->user_id = $session->user_id;
        $sessionRepo->branch_id = $session->branch_id;

        return $sessionRepo;
    }
}
