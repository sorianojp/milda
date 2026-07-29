<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CourseMaterialController extends Controller
{
    public function syllabus(): BinaryFileResponse
    {
        return response()->download(
            storage_path('app/private/course-materials/MILDA01-SYL.docx'),
            'MILDA01-SYL.docx',
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        );
    }
}
