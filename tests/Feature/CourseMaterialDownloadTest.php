<?php

test('students can download the MILDA course syllabus', function () {
    $this->get(route('course-materials.syllabus'))
        ->assertOk()
        ->assertDownload('MILDA01-SYL.docx');
});
