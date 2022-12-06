package gifterz.textme.domain.letter.service;

import gifterz.textme.domain.letter.dto.request.LetterRequest;
import gifterz.textme.domain.letter.dto.response.LetterResponse;
import gifterz.textme.domain.letter.entity.Letter;
import gifterz.textme.domain.letter.exception.LetterNotFoundException;
import gifterz.textme.domain.letter.repository.LetterRepository;
import gifterz.textme.domain.user.entity.User;
import gifterz.textme.domain.user.exception.UserNotFoundException;
import gifterz.textme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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

    public List<LetterResponse> findLettersByUserId(Long id) {
        Optional<User> userExist = userRepository.findById(id);
        if (userExist.isPresent()) {
            User user = userExist.get();
            PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "id"));
            Slice<Letter> letterList = letterRepository.findAllByUserId(user.getId(), pageRequest);
            return letterList.stream()
                    .map(letter -> new LetterResponse(letter.getId(), user.getName(), letter.getSenderName(),
                            letter.getContents(), letter.getImageUrl()))
                    .collect(Collectors.toList());
        }
        throw new UserNotFoundException();
    }

    public LetterResponse findLetter(String email, Long id) {
        Optional<User> userExist = userRepository.findByEmail(email);
        if (userExist.isEmpty()) {
            throw new UserNotFoundException();
        }
        User user = userExist.get();
        Optional<Letter> letterExist = letterRepository.findById(id);
        if (letterExist.isEmpty()) {
            throw new LetterNotFoundException();
        }
        Letter letter = letterExist.get();
        return new LetterResponse(letter.getId(), user.getName(), letter.getSenderName(),
                letter.getContents(), letter.getImageUrl());
    }
}
