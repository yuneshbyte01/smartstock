package com.smartstock.controller;

import com.smartstock.dto.UserProfileResponse;
import com.smartstock.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication auth) {
        UserProfileResponse profile = userService.getCurrentUserProfile(auth);
        return ResponseEntity.ok(profile);
    }
}
