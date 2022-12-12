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
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LetterService {
    private final UserRepository userRepository;
    private final LetterRepository letterRepository;

    @Transactional
    public LetterResponse makeLetter(LetterRequest request) {
        User user = userRepository.findById(request.getReceiverId()).orElseThrow(UserNotFoundException::new);
        Letter letter = Letter.of(user, request.getSenderName(), request.getContents(), request.getImageUrl());
        letterRepository.save(letter);
        notifyLetterSent(letter);
        return new LetterResponse(letter.getId(), user.getName(), request.getSenderName(),
                request.getContents(), request.getImageUrl());
    }

    private void notifyLetterSent(Letter letter) {
        letter.publishEvent(letter);
    }

    public List<LetterResponse> findLettersByUserId(Long id) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "id"));
        Slice<Letter> letterList = letterRepository.findAllByUserId(user.getId(), pageRequest);
        return letterList.stream()
                .map(letter -> new LetterResponse(letter.getId(), user.getName(), letter.getSenderName(),
                        letter.getContents(), letter.getImageUrl()))
                .collect(Collectors.toList());
    }

    public LetterResponse findLetter(String email, Long id) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Letter letter = letterRepository.findById(id).orElseThrow(LetterNotFoundException::new);
        return new LetterResponse(letter.getId(), user.getName(), letter.getSenderName(),
                letter.getContents(), letter.getImageUrl());
    }
}
