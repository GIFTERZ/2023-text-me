package gifterz.textme.domain.letter.controller;

import gifterz.textme.domain.letter.dto.request.LetterRequest;
import gifterz.textme.domain.letter.dto.response.LetterResponse;
import gifterz.textme.domain.letter.service.LetterService;
import gifterz.textme.domain.security.jwt.JwtAuth;
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

    @GetMapping("/members/{id}")
    public ResponseEntity<List<LetterResponse>> findLetters(@PathVariable("id") final Long id) {
        List<LetterResponse> letterResponses = letterService.findLettersByUserId(id);
        return ResponseEntity.ok().body(letterResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LetterResponse> findLetter(@JwtAuth final String email, @PathVariable("id") final Long id) {
        LetterResponse letterResponse = letterService.findLetter(email, id);
        return ResponseEntity.ok().body(letterResponse);
    }
}
