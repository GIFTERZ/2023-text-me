package gifterz.textme.domain.letter.controller;

import gifterz.textme.domain.letter.dto.request.*;
import gifterz.textme.domain.letter.dto.response.AllLetterResponse;
import gifterz.textme.domain.letter.dto.response.LetterResponse;
import gifterz.textme.domain.letter.dto.response.SlowLetterWithAddressResponse;
import gifterz.textme.domain.letter.dto.response.SlowLetterWithEmailResponse;
import gifterz.textme.domain.letter.service.LetterService;
import gifterz.textme.domain.security.jwt.JwtAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

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
    public ResponseEntity<List<AllLetterResponse>> findLetters(@PathVariable("id") final String id) {
        List<AllLetterResponse> letterResponses = letterService.findLettersByUserId(id);
        return ResponseEntity.ok().body(letterResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LetterResponse> findLetter(@JwtAuth final String email, @PathVariable("id") final Long id) {
        LetterResponse letterResponse = letterService.findLetter(email, id);
        return ResponseEntity.ok().body(letterResponse);
    }

    @PostMapping("/email")
    public ResponseEntity<SlowLetterWithEmailResponse> sendSlowLetterWithEmail(
            @RequestBody final SlowLetterWithEmailRequest request) {
        SlowLetterWithEmailResponse letterResponse =
                letterService.sendSlowLetterWithEmail(request.toEmailWithContents());
        return ResponseEntity.ok().body(letterResponse);
    }

    @PostMapping("/address")
    public ResponseEntity<SlowLetterWithAddressResponse> sendSlowLetterWithAddress(
            @RequestBody final SlowLetterWithAddressRequest request) {
        SlowLetterWithAddressResponse letterResponse = letterService.sendSlowLetterWithAddress(
                request.toAddress(), request.toSenderInfo(), request.contents());
        return ResponseEntity.ok().body(letterResponse);
    }
}
