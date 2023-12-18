package gifterz.textme.domain.letter.controller;

import gifterz.textme.domain.letter.dto.request.LetterRequest;
import gifterz.textme.domain.letter.dto.response.AllLetterResponse;
import gifterz.textme.domain.letter.dto.response.LetterResponse;
import gifterz.textme.domain.letter.service.LetterService;
import gifterz.textme.domain.security.jwt.JwtAuth;
import gifterz.textme.domain.security.service.AesUtils;
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
    private final AesUtils aesUtils;
    @PostMapping
    public ResponseEntity<LetterResponse> sendLetter(@RequestBody @Valid final LetterRequest request) {
        LetterResponse letterResponse = letterService.makeLetter(request);
        return ResponseEntity.ok().body(letterResponse);
    }

    @GetMapping("/members/{id}")
    public ResponseEntity<List<AllLetterResponse>> findLetters(@PathVariable("id") final String id) {
        String decryptedId = aesUtils.decryption(id);
        Long decryptedUserId = Long.valueOf(decryptedId);
        List<AllLetterResponse> letterResponses = letterService.findLettersByUserId(decryptedUserId);
        return ResponseEntity.ok().body(letterResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LetterResponse> findLetter(@JwtAuth final String email, @PathVariable("id") final Long id) {
        LetterResponse letterResponse = letterService.findLetter(email, id);
        return ResponseEntity.ok().body(letterResponse);
    }
}
