package com.example.server;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;
import org.springframework.test.context.ActiveProfiles;



@Suite
@SelectClasses({UserRoutesTest.class})
@ActiveProfiles("test")
class StudyWebappApplicationTest {

}
