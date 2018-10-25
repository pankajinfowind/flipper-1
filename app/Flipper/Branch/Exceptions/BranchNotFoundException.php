<?php

namespace App\Flipper\Branch\Exceptions;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BranchNotFoundException extends NotFoundHttpException
{

    /**
     * EmployeeNotFoundException constructor.
     */
    public function __construct()
    {
        parent::__construct('Branch not found.');
    }
}
