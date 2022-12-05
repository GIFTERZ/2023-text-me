package domain.letter.service;

import domain.letter.dto.request.LetterRequest;
import domain.letter.dto.response.LetterResponse;
import domain.letter.entity.Letter;
import domain.letter.repository.LetterRepository;
import domain.user.exception.UserNotFoundException;
import domain.user.repository.UserRepository;
import domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LetterService {
    private final UserRepository userRepository;
    private final LetterRepository letterRepository;
    @Transactional
    public LetterResponse makeLetter(LetterRequest request) {
        Optional<User> userExist = userRepository.findById(request.getReceiverId());
        if (userExist.isPresent()) {
            User user = userExist.get();
            Letter letter = Letter.of(user, request.getSenderName(), request.getContents(), request.getImageUrl());
            letterRepository.save(letter);
            return new LetterResponse(letter.getId(), user.getName(), request.getSenderName(), request.getContents(), request.getImageUrl());
        }
        throw new UserNotFoundException();
    }
}
