package com.smartstock.service;

import com.smartstock.dto.UserProfileResponse;
import com.smartstock.model.User;
import com.smartstock.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileResponse getCurrentUserProfile(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        return new UserProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
