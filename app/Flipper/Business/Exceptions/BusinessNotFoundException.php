<?php

namespace App\Flipper\Business\Exceptions;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BusinessNotFoundException extends NotFoundHttpException
{

    /**
     * EmployeeNotFoundException constructor.
     */
    public function __construct()
    {
        parent::__construct('Business not found.');
    }
}
