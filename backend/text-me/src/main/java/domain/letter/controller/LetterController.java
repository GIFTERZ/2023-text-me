package domain.letter.controller;

import domain.letter.service.LetterService;
import domain.letter.dto.request.LetterRequest;
import domain.letter.dto.response.LetterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<LetterResponse>> getLetters(@RequestParam("id") final Long id) {
        List<LetterResponse> letterResponses = letterService.getLettersByUserId(id);
        return ResponseEntity.ok().body(letterResponses);
    }
}
