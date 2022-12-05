package domain.letter.controller;

import domain.letter.service.LetterService;
import domain.letter.dto.request.LetterRequest;
import domain.letter.dto.response.LetterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/letters")
@RequiredArgsConstructor
public class LetterController {
    private final LetterService letterService;
    @PostMapping
    public ResponseEntity<LetterResponse> sendLetter(@RequestBody @Valid final LetterRequest request) {
        LetterResponse letterResponse = letterService.makeLetter(request);
        return ResponseEntity.ok().body(letterResponse);
    }
}
