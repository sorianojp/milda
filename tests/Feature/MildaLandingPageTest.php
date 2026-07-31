<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the React MILDA prototype is served from the home page', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('milda')
            ->where('syllabusUrl', route('course-materials.syllabus'))
        );
});
