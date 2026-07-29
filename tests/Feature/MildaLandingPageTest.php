<?php

test('the MILDA prototype is served from the home page', function () {
    $this->get('/')
        ->assertOk()
        ->assertSee('Learn to verify.')
        ->assertSee('Explore the prototype')
        ->assertSee('Student Dashboard')
        ->assertSee('MILDA Course Modules');
});
