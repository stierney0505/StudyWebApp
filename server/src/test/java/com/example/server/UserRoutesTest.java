package com.example.server;

import com.example.server.entities.User;
import com.example.server.routes.UserRoutes;
import com.example.server.security.UserSecurityConfig;
import com.example.server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// UserRouteTests exist to test the function of the UserRoutes rest controller. It exists to ensure that the date given
// through the UserService is formatting in a consistent way.
@WebMvcTest(UserRoutes.class)
@ExtendWith(SpringExtension.class)
@Import({UserSecurityConfig.class})
@ActiveProfiles("test")
public class UserRoutesTest {
        @Value("${routes.users}")
        private String endPoint;

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private UserService service;

        private final ObjectMapper Obj = new ObjectMapper();

        @Test
        public void getUserByIDTest() throws Exception {
            User returnUser = new User("Bepis", "Jones", "bjones@gmail.com", "testpassword");
            returnUser.setId(1);

            when(service.findUserById(1)).thenReturn(returnUser);

            // Perform the GET request to /api/users/1 and verify the response
            mockMvc.perform(get(endPoint + "/1"))
                    .andExpect(status().isOk()) // Check for HTTP 200 OK status
                    .andExpect(content().contentType("application/json")) // Optional: Verify content type
                    .andExpect(jsonPath("$.firstName").value("Bepis")) // Example: Verify response JSON content
                    .andExpect(jsonPath("$.email").value("bjones@gmail.com"));
        }

        @Test
        public void getAllUsers() throws Exception {
            User[] returnUsers = {new User("Bepis", "Jones", "bjones@gmail.com", "testpassword"),
                                new User("Bingus", "Jones", "bjones2@gmail.com", "testpassword2")};
            returnUsers[0].setId(1);
            returnUsers[1].setId(2);

            when(service.findAllUsers()).thenReturn(List.of(returnUsers));

            // Perform the GET request to /api/users and verify the response
            mockMvc.perform(get(endPoint))
                    .andExpect(status().isOk()) // Check for HTTP 200 OK status
                    .andExpect(content().contentType("application/json"))
                    .andExpect(jsonPath("$.length()").value(returnUsers.length))
                    .andExpect(jsonPath("$[0].firstName").value("Bepis"))
                    .andExpect(jsonPath("$[1].firstName").value("Bingus"))
                    .andExpect(jsonPath("$[0].email").value("bjones@gmail.com"))
                    .andExpect(jsonPath("$[1].email").value("bjones2@gmail.com"));
        }

        @Test
        public void createUser() throws Exception {
            User provideUser = new User("Large", "Man", "lman@gmail.com", "testpassword");

            // It doesn't matter that the mocked return user doesn't match the expected values that the service would provide
            // because these tests test for formatting and endpoints.
            when(service.saveUser(provideUser)).thenReturn(provideUser);

            mockMvc.perform(post(endPoint)
                            .accept("application/json")
                            .contentType("application/json")
                            .content(Obj.writeValueAsString(provideUser)))
                    .andExpect(status().isOk()) // Check for HTTP 200 OK status
                    .andExpect(content().contentType("application/json"))
                    .andExpect(jsonPath("$.id").value(0))
                    .andExpect(jsonPath("$.firstName").value("Large"));
        }

        @Test
        public void deleteUser() throws Exception {
            mockMvc.perform(delete(endPoint + "/1"))
                    .andExpect(status().isOk()); // Check for HTTP 200 OK status
        }

        @Test
        public void updateUser() throws Exception {
            User provideUser = new User("Large", "Man", "lman@gmail.com", "testpassword");
            // It doesn't matter that the mocked return user doesn't match the expected values that the service would provide
            // because these tests test for formatting and endpoints.
            when(service.updateUser(provideUser, 1)).thenReturn(provideUser);

            mockMvc.perform(put(endPoint + "/1")
                            .accept("application/json")
                            .contentType("application/json")
                            .content(Obj.writeValueAsString(provideUser)))
                    .andExpect(status().isOk()) // Check for HTTP 200 OK status
                    .andExpect(content().contentType("application/json"))
                    .andExpect(jsonPath("$.id").value(0))
                    .andExpect(jsonPath("$.firstName").value("Large"));
        }
}